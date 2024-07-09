import ReactToPrint from 'react-to-print';
import VistaContinua from './curriculumVer';

const PrintButton = () => {
    const componentRef = useRef();

    return (
        <>
            <ReactToPrint
                trigger={() => (
                    <Button variant="primary">Imprimir o Descargar PDF</Button>
                )}
                content={() => componentRef.current}
            />
            <div style={{ display: 'none' }}>
                <VistaContinua ref={componentRef} />
            </div>
        </>
    );
};
export default PrintButton;
