import pdfshift from 'pdfshift';

const convertToPdf = async () => {
    try {
        const htmlContent = document.documentElement.outerHTML; // Obtén todo el HTML de la página
        const pdfBuffer = await pdfshift.convert(htmlContent, {
            // Puedes añadir opciones de PDFShift aquí
        });
        
        // Descargar el PDF
        const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `CV_${id}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error al convertir el HTML a PDF:', error);
    }
};
