import React from 'react'
import { BrandCard, HomeSectionTitle } from '..'
import brandImg from '../../assets/images/hm.webp'

const HomeBrands = (props) => {
    return (
        <div className="responsive container-mx my-10">
            <HomeSectionTitle title='BRANDS WE TRUST' path='/brands' />
            <div className="home-brands-container mt-4">
                {
                    props.data?.map((e, i) => <BrandCard key={i} image={e?.photo} name={e?.name}
                    />)
                }
            </div>
        </div>
    )
}

export default HomeBrands