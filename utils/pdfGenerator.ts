import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Reservation, QuoteRequest } from '../lib/db';

// Extender jsPDF para incluir autoTable (necesario para TypeScript)
interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => void;
}

export const generateQuotePDF = (data: QuoteRequest | Reservation, mode: 'quote' | 'invoice' | 'receipt' = 'quote') => {
  const doc = new jsPDF() as jsPDFWithAutoTable;
  const isReservation = 'eventDate' in data;

  // Determinar título
  let docTitle = 'COTIZACIÓN DE SERVICIOS';
  if (mode === 'invoice') docTitle = 'FACTURA DE VENTA';
  if (mode === 'receipt') docTitle = 'RECIBO DE CAJA';
  if (mode === 'quote' && isReservation) docTitle = 'RESUMEN DE RESERVA';

  // Colores de marca
  const primaryColor = [120, 152, 148]; // #789894 (Sage)
  const secondaryColor = [186, 161, 118]; // #BAA176 (Gold)
  const inkColor = [7, 16, 20]; // #071014 (Ink)

  // Header
  doc.setFillColor(inkColor[0], inkColor[1], inkColor[2]);
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('MILES VISUAL', 105, 20, { align: 'center' });
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('FOTOGRAFÍA EDITORIAL & AUDIOVISUAL', 105, 28, { align: 'center', charSpace: 2 });

  // Título del documento
  doc.setTextColor(inkColor[0], inkColor[1], inkColor[2]);
  doc.setFontSize(18);
  doc.text(docTitle, 20, 55);
  
  doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setLineWidth(0.5);
  doc.line(20, 58, 80, 58);

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
    doc.text(`#MV-${(data as Reservation).id || 'PEND'}`, 165, 82);
  }

  // Detalles del Servicio
  const serviceName = isReservation ? (data as Reservation).serviceType : (data as QuoteRequest).serviceInterested;
  const price = isReservation ? (data as Reservation).value : 0;
  const eventDate = isReservation ? (data as Reservation).eventDate : 'Por definir';

  doc.autoTable({
    startY: 105,
    head: [['DESCRIPCIÓN DEL SERVICIO', 'DETALLE', 'VALOR']],
    body: [
      ['TIPO DE SERVICIO', serviceName, ''],
      ['FECHA DEL EVENTO', eventDate, ''],
      ['ESTADO', isReservation ? (data as Reservation).status.toUpperCase() : 'PENDIENTE', ''],
      ['VALOR TOTAL', '', `$ ${price.toLocaleString()}`]
    ],
    headStyles: { 
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 9,
      cellPadding: 6
    },
    columnStyles: {
      2: { halign: 'right', fontStyle: 'bold' }
    }
  });

  // Mensaje y Términos
  const finalY = (doc as any).lastAutoTable.finalY || 150;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(mode === 'invoice' ? 'DETALLES DE PAGO:' : 'NOTAS IMPORTANTE:', 20, finalY + 20);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(inkColor[0], inkColor[1], inkColor[2]);
  doc.setFontSize(8);
  const terms = mode === 'invoice' ? [
    '- Favor realizar el pago a la cuenta de ahorros Bancolombia #XXX-XXXXXX-XX.',
    '- Enviar comprobante de pago al correo hola@milesvisual.com.',
    '- Esta factura no es un título valor, es un soporte de cobro por servicios profesionales.',
    '- Gracias por confiar en Miles Visual para capturar tus momentos.'
  ] : [
    '- Esta cotización tiene una vigencia de 15 días a partir de la fecha de emisión.',
    '- Para confirmar la reserva se requiere el pago del 30% del valor total.',
    '- Los precios incluyen edición profesional y entrega en galería digital privada.',
    '- El saldo restante debe cancelarse máximo 8 días antes del evento.'
  ];
  doc.text(terms, 20, finalY + 28);

  // Firma
  doc.setDrawColor(200, 200, 200);
  doc.line(130, finalY + 60, 180, finalY + 60);
  doc.setFontSize(8);
  doc.text('FIRMA AUTORIZADA', 155, finalY + 65, { align: 'center' });
  doc.text('MILES VISUAL STUDIO', 155, finalY + 70, { align: 'center' });

  // Footer
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text('www.milesvisual.com | hola@milesvisual.com | @milesvisual', 105, 285, { align: 'center' });

  // Guardar
  const fileName = isReservation ? `Reserva_${data.clientName.replace(/\s/g, '_')}.pdf` : `Cotizacion_${data.clientName.replace(/\s/g, '_')}.pdf`;
  doc.save(fileName);
};
