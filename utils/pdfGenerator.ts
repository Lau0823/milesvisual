import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Reservation, QuoteRequest } from '../lib/db';
import { useAdminStore } from '../store/useAdminStore';

export const generateQuotePDF = async (data: QuoteRequest | Reservation, mode: 'quote' | 'invoice' | 'receipt' = 'quote', logoUrl?: string) => {
  const doc = new jsPDF();
  const isReservation = 'eventDate' in data;

  const DEFAULT_LOGO = "https://res.cloudinary.com/dgfp5gcjr/image/upload/v1778043651/LOGO_MILES_AMARILLO_Mesa_de_trabajo_1_elqbnp.png";
  const finalLogoUrl = logoUrl || DEFAULT_LOGO;

  // Función para cargar imagen y convertir a Base64
  const getBase64Image = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  // Determinar título
  let docTitle = 'COTIZACIÓN DE SERVICIOS';
  if (mode === 'invoice') docTitle = 'FACTURA DE VENTA';
  if (mode === 'receipt') docTitle = 'RECIBO DE CAJA';
  if (mode === 'quote' && isReservation) docTitle = 'RESUMEN DE RESERVA';

  // Colores de marca
  const primaryColor: [number, number, number] = [120, 152, 148]; // #789894 (Sage)
  const secondaryColor: [number, number, number] = [186, 161, 118]; // #BAA176 (Gold)
  const inkColor: [number, number, number] = [7, 16, 20]; // #071014 (Ink)

  // Header
  doc.setFillColor(inkColor[0], inkColor[1], inkColor[2]);
  doc.rect(0, 0, 210, 45, 'F');

  if (finalLogoUrl) {
    try {
      const base64Logo = await getBase64Image(finalLogoUrl);
      // Centrar el logo (ajustar dimensiones según necesidad)
      doc.addImage(base64Logo, 'PNG', 85, 5, 40, 25);
    } catch (e) {
      console.warn("No se pudo cargar el logo, usando texto");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text('MILES VISUAL', 105, 20, { align: 'center' });
    }
  } else {
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('MILES VISUAL', 105, 20, { align: 'center' });
  }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('FOTOGRAFÍA EDITORIAL & AUDIOVISUAL', 105, 35, { align: 'center', charSpace: 2 });

  // Título del documento
  doc.setTextColor(inkColor[0], inkColor[1], inkColor[2]);
  doc.setFontSize(18);
  doc.text(docTitle, 20, 60);
  
  doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setLineWidth(0.5);
  doc.line(20, 63, 80, 63);

  // Información del Cliente
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('CLIENTE:', 20, 75);
  doc.setFont('helvetica', 'normal');
  doc.text(data.clientName, 50, 75);

  doc.setFont('helvetica', 'bold');
  doc.text('CORREO:', 20, 82);
  doc.setFont('helvetica', 'normal');
  doc.text(data.email, 50, 82);

  doc.setFont('helvetica', 'bold');
  doc.text('TELÉFONO:', 20, 89);
  doc.setFont('helvetica', 'normal');
  doc.text(data.phone, 50, 89);

  doc.setFont('helvetica', 'bold');
  doc.text('FECHA:', 140, 75);
  doc.setFont('helvetica', 'normal');
  doc.text(new Date().toLocaleDateString(), 165, 75);

  if (isReservation) {
    doc.setFont('helvetica', 'bold');
    doc.text(mode === 'invoice' ? 'FACTURA NO:' : 'ID RESERVA:', 140, 82);
    doc.setFont('helvetica', 'normal');
    doc.text(`#MV-${(data as any).id || 'PEND'}`, 165, 82);
  }

  // Detalles del Servicio
  const resData = data as any;
  const serviceName = isReservation ? resData.serviceType : (data as QuoteRequest).serviceInterested;
  const price = Number(isReservation ? resData.value : 0);
  const anticipo = Number(isReservation ? (resData.anticipo || 0) : 0);
  const saldo = price - anticipo;
  const eventDate = isReservation ? resData.eventDate : 'Por definir';

  // Ajustar título dinámicamente
  if (isReservation && mode === 'quote') {
    if (saldo <= 0) docTitle = 'RECIBO DE PAGO TOTAL';
    else if (anticipo > 0) docTitle = 'RECIBO DE ABONO & RESERVA';
  }

  const tableBody = [
    ['TIPO DE SERVICIO', serviceName, ''],
    ['FECHA DEL EVENTO', eventDate, ''],
    ['ESTADO', isReservation ? resData.status.toUpperCase() : 'PENDIENTE', ''],
    ['VALOR TOTAL', '', `$ ${price.toLocaleString()}`]
  ];

  if (isReservation && anticipo > 0) {
    tableBody.push(['ANTICIPO / ABONO', '', `$ ${anticipo.toLocaleString()}`]);
    tableBody.push(['SALDO PENDIENTE', '', `$ ${saldo.toLocaleString()}`]);
  }

  autoTable(doc, {
    startY: 105,
    head: [['DESCRIPCIÓN DEL SERVICIO', 'DETALLE', 'VALOR']],
    body: tableBody,
    headStyles: { 
      fillColor: primaryColor,
      textColor: [255, 255, 255] as [number, number, number],
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 9,
      cellPadding: 6
    },
    columnStyles: {
      2: { halign: 'right', fontStyle: 'bold' }
    },
    didParseCell: function(data: any) {
      if (data.row.index === tableBody.length - 1 && data.column.index === 2) {
        data.cell.styles.textColor = saldo > 0 ? [186, 161, 118] as [number, number, number] : [120, 152, 148] as [number, number, number];
      }
    }
  });

  const finalY = (doc as any).lastAutoTable.finalY || 150;

  // Firma (Izquierda) - Más arriba
  doc.setDrawColor(200, 200, 200);
  doc.line(20, finalY + 15, 80, finalY + 15);
  doc.setFontSize(8);
  doc.text('FIRMA AUTORIZADA', 50, finalY + 20, { align: 'center' });
  doc.text('MILES VISUAL STUDIO', 50, finalY + 25, { align: 'center' });

  // Cuentas de Pago (Derecha) - Más arriba
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('CUENTAS PARA PAGO:', 110, finalY + 15);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(inkColor[0], inkColor[1], inkColor[2]);
  doc.setFontSize(8);
  
  doc.text('Miles Esteban Morales Andrade', 110, finalY + 21);
  doc.setFont('helvetica', 'normal');
  doc.text('Cc 1001309695', 110, finalY + 25);
  doc.text('Productor Audiovisual', 110, finalY + 29);
  doc.text('Instagram: @milesvisualproducciones', 110, finalY + 33);
  
  let paymentY = finalY + 41;
  
  doc.setFont('helvetica', 'bold');
  doc.text('BANCOLOMBIA (Ahorros):', 110, paymentY);
  doc.setFont('helvetica', 'normal');
  doc.text('05733188474', 160, paymentY);
  paymentY += 5;

  doc.setFont('helvetica', 'bold');
  doc.text('NEQUI:', 110, paymentY);
  doc.setFont('helvetica', 'normal');
  doc.text('3148112717', 160, paymentY);
  paymentY += 5;

  doc.setFont('helvetica', 'bold');
  doc.text('DAVIPLATA:', 110, paymentY);
  doc.setFont('helvetica', 'normal');
  doc.text('3148112717', 160, paymentY);
  paymentY += 5;

  doc.setFont('helvetica', 'bold');
  doc.text('CUENTA NU (Llave):', 110, paymentY);
  doc.setFont('helvetica', 'normal');
  doc.text('@QSV309', 160, paymentY);

  // Mensaje y Términos (Centrado) - Al final
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(mode === 'invoice' ? 'DETALLES DE PAGO:' : 'NOTAS IMPORTANTES:', 105, finalY + 60, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(inkColor[0], inkColor[1], inkColor[2]);
  doc.setFontSize(8);
  const state = useAdminStore.getState();
  const whatsappSetting = state.settings.find(s => s.key === 'whatsapp_number');
  const whatsapp = whatsappSetting ? whatsappSetting.value : '573148112717';

  const terms = mode === 'invoice' ? [
    '- Enviar comprobante de pago al WhatsApp +' + whatsapp + '.',
    '- Esta factura no es un título valor, es un soporte de cobro.',
    '- Gracias por confiar en Miles Visual para capturar tus momentos.'
  ] : [
    '- Esta cotización tiene una vigencia de 15 días.',
    '- Para confirmar reserva se requiere abono del 50%.',
    '- Precios incluyen edición y entrega digital.',
    '- El saldo debe cancelarse 8 días antes del evento.'
  ];
  doc.text(terms, 105, finalY + 68, { align: 'center' });

  // Footer
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text('www.milesvisual.com | hola@milesvisual.com | @milesvisual', 105, 285, { align: 'center' });

  // Guardar
  const fileName = isReservation ? `Reserva_${data.clientName.replace(/\s/g, '_')}.pdf` : `Cotizacion_${data.clientName.replace(/\s/g, '_')}.pdf`;
  doc.save(fileName);
};
