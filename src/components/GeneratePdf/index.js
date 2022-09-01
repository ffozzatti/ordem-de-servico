import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { MdPictureAsPdf } from "react-icons/md";
import { useFetch } from "../../hooks/useFetch";
import './styles.css'


const url = "http://localhost:3000/serviceOrder"


const GeneratePdf = () => {
    const {data: items} = useFetch(url)

    const itemsList = items && items.map((items) => (
        [
            {text: items.service, style: 'tableHeader', fontSize: 10}, 
            {text: 'R$ ' + items.price, style: 'tableHeader', fontSize: 10}
        ]
        
    ))

    const sumTotalValue = items && items.map(sumTotalValue => sumTotalValue.price).reduce(( value, next) => value + next, 0)  


    

    const makePdf = () => {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;

        const reportTitle = [
            {
                text: 'Ordem de Serviço',
                fontSize: 25,
                bold: true,
                margin: [15, 20, 0, 45],
                alignment: 'center'
            }
        ]

        const details = [{
            table:{
                headerRows: 1,
                widths: ['*', '*'],
				body: 
                    [
                        [
                            {text: 'Serviço', style: 'tableHeader', fontSize: 10}, 
                            {text: 'Orçamento', style: 'tableHeader', fontSize: 10},
                        ],
                        ...itemsList,
                        [
                            {text: 'Total', style: 'tableHeader' },
                            {text: 'R$ ' + sumTotalValue, style: 'tableHeader' }
                        ]
                    ]   
            },
            layout: 'headerLineOnly'
        }]

        function Rodape(currentPage, pageCount){
            return [
                {
                    text: currentPage + ' / ' + pageCount,
                    alignment: 'right',
                    fontSize: 9,
                    margin: [0, 10, 20, 0]
                }
            ]
        }


        const docDefinidos = {
            pageSize: 'A4', 
            pageMargins: [15, 50, 15, 40],

            header: [reportTitle],
            content: [details],
            footer: Rodape

        }

        pdfMake.createPdf(docDefinidos).download()

        
    }


  return (
    <div className="generateButton">
        <button onClick={makePdf}>
            <span>
                <MdPictureAsPdf />  Gerar PDF
            </span>
        </button>
    </div>
  )
}

export default GeneratePdf