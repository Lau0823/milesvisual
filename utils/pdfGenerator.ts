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
      doc.addImage(base64Logo, 'PNG', 84, 5, 42, 28);
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
  doc.text('FOTOGRAFÍA EDITORIAL & AUDIOVISUAL', 105, 30, { align: 'center', charSpace: 2 });

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
      fontSize: 9,
      fontStyle: 'bold',
      cellPadding: 4
    },
    bodyStyles: {
      fontSize: 8.5,
      cellPadding: 4
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

  let finalY = (doc as any).lastAutoTable.finalY || 150;
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

  // Validar si hay espacio suficiente en la página (el bloque inferior ocupa ~85mm)
  if (finalY + 85 > 280) {
    // Imprimir footer en la página actual antes de saltar
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.text('www.milesvisual.com | hola@milesvisual.com | @milesvisual', 105, 285, { align: 'center' });
    doc.addPage();
    finalY = 10;
  }

  let sectionY = finalY + 8;

  // 1. CUENTAS PARA PAGO - Título
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('CUENTAS PARA PAGO:', 20, sectionY);
  
  // -- COLUMNA IZQUIERDA (Info personal) --
  // Icono Banco
  const iconX = 29;
  const iconY = sectionY + 13;
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.circle(iconX, iconY, 9, 'F');
  
  doc.setFillColor(255, 255, 255);
  // Techo
  doc.triangle(iconX, iconY - 5, iconX - 6, iconY - 2, iconX + 6, iconY - 2, 'F');
  doc.rect(iconX - 6, iconY - 2, 12, 1, 'F');
  // Columnas
  doc.rect(iconX - 5, iconY - 0.5, 1.2, 4, 'F');
  doc.rect(iconX - 1.8, iconY - 0.5, 1.2, 4, 'F');
  doc.rect(iconX + 1.4, iconY - 0.5, 1.2, 4, 'F');
  doc.rect(iconX + 4.6, iconY - 0.5, 1.2, 4, 'F');
  // Base
  doc.rect(iconX - 6, iconY + 3.5, 12, 1, 'F');
  doc.rect(iconX - 7, iconY + 4.5, 14, 1.5, 'F');

  // Texto junto al icono
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(inkColor[0], inkColor[1], inkColor[2]);
  doc.setFontSize(9);
  doc.text('Miles Esteban Morales Andrade', 44, sectionY + 8);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Cc 1001309695', 44, sectionY + 13);
  doc.text('Productor Audiovisual', 44, sectionY + 18);
  doc.text('Instagram: @milesvisualproducciones', 44, sectionY + 23);

  // -- COLUMNA DERECHA (Bancos) --
  const bankLeft = 115;
  const bankRight = 165;
  let bankY = sectionY + 8; // Alineado con el primer texto

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('BANCOLOMBIA (Ahorros):', bankLeft, bankY);
  doc.setFont('helvetica', 'normal');
  doc.text('05733188474', bankRight, bankY);
  bankY += 5;

  doc.setFont('helvetica', 'bold');
  doc.text('NEQUI:', bankLeft, bankY);
  doc.setFont('helvetica', 'normal');
  doc.text('3148112717', bankRight, bankY);
  bankY += 5;

  doc.setFont('helvetica', 'bold');
  doc.text('DAVIPLATA:', bankLeft, bankY);
  doc.setFont('helvetica', 'normal');
  doc.text('3148112717', bankRight, bankY);
  bankY += 5;

  doc.setFont('helvetica', 'bold');
  doc.text('CUENTA NU (Llave):', bankLeft, bankY);
  doc.setFont('helvetica', 'normal');
  doc.text('@QSV309', bankRight, bankY);

  sectionY += 30; // Bajamos después de las columnas

  // Línea separadora
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(0.3);
  doc.line(20, sectionY, 190, sectionY);

  // 2. FIRMA - Centrado
  sectionY += 10;

  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('FIRMA AUTORIZADA', 105, sectionY, { align: 'center' });

  sectionY += 24; // Espacio amplio para firma
  doc.setDrawColor(inkColor[0], inkColor[1], inkColor[2]);
  doc.setLineWidth(0.5);
  doc.line(65, sectionY, 145, sectionY);

  sectionY += 5;
  doc.setFontSize(8);
  doc.setTextColor(inkColor[0], inkColor[1], inkColor[2]);
  doc.setFont('helvetica', 'normal');
  doc.text('MILES VISUAL STUDIO', 105, sectionY, { align: 'center' });

  // 3. NOTAS IMPORTANTES
  sectionY += 12;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(
    mode === 'invoice'
      ? 'DETALLES DE PAGO:'
      : 'NOTAS IMPORTANTES:',
    20,
    sectionY
  );

  sectionY += 6;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(inkColor[0], inkColor[1], inkColor[2]);
  doc.text(terms, 20, sectionY);

  // Footer
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text('www.milesvisual.com | hola@milesvisual.com | @milesvisual', 105, 285, { align: 'center' });

  // Guardar
  const fileName = isReservation ? `Reserva_${data.clientName.replace(/\s/g, '_')}.pdf` : `Cotizacion_${data.clientName.replace(/\s/g, '_')}.pdf`;
  doc.save(fileName);
};
