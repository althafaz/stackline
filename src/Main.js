import logo from './stackline_logo.svg'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
export default function Main() {

    const [productData, getProductData] = useState([])

    useEffect(() => {
        getAllProductData()
    },[])

    const getAllProductData = ()=> {
        axios.get(`${process.env.REACT_APP_BASE_URL}/product/`)
             .then((response) => {
                console.log(response)
                const allProductsData = response.data
                getProductData(allProductsData)
             })
             .catch(err=>{console.error(`Error:${err}`)})
    }

    const product = productData.map((i,idx) => {
        return(
        <div className='main'>
            <nav>
                <img src={logo} alt="Stackline" height="20px"/>
            </nav>
            <article key={idx}>
                <section className='product-overview'>
                    <img src={i.image} alt={i.title} />
                    <h6>{i.title}</h6>
                    <p>{i.subtitle}</p>
                    <ul>
                        {i.tags.map((tag, tIdx) =>{
                        return(
                            <li key={tIdx}>{tag}</li>
                        )
                        })}
                    </ul>
                </section>
                <section className='product-sales'>
                    <div className='pro-graph'>
                        <h6>graph</h6>
                    </div>
                    <div className='pro-table'>
                        <table> 
                            <thead>
                                <tr>
                                    <th>Week Ending</th>
                                    <th>Retail Sales</th>
                                    <th>Wholesale Sales</th>
                                    <th>Unit Sold</th>
                                    <th>Retailer Margin</th>
                                </tr>
                            </thead> 
                            <tbody>                          
                            {i.sales.map((s, sIdx)=>{
                            return (
                            <tr key={sIdx}>
                                <td>{s.weekEnding}</td>
                                <td>{s.retailSales}</td>
                                <td>{s.wholesaleSales}</td>
                                <td>{s.unitsSold}</td>
                                <td>{s.retailerMargin}</td>
                            </tr>
                            )
                            })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </article>
        </div>
        )

    })
    
    return  (
            
        <div>
            <h1>Hello</h1>
                {product}
        </div>

    )
}