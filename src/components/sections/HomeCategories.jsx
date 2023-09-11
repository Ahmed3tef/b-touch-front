import React from 'react';
import { Carrousel, CategoryCard, HomeSectionLayout, HomeSectionTitle } from '..';
import bannerImg from '../../assets/images/banner-1.png';

const bannerData = [
    {
        image: bannerImg,
        title: 'some title',
        description: 'some description'
    },
    {
        image: bannerImg,
        title: 'some title',
        description: 'some description'
    },
    {
        image: bannerImg,
        title: 'some title',
        description: 'some description'
    },
]

const HomeCategories = ({ categories, carrouselData }) => {
    const data = [...new Array(12)];

    return (
        <div className="bg-black py-[2rem]">
            <Carrousel type={3} data={carrouselData} />
            <div className="container-mx my-10">
                <HomeSectionTitle title="POPULAR CATEGORIES" path='/categories' btn='alt' />
                <HomeSectionLayout>
                    {categories.map((e, i) => <CategoryCard key={i} category={e} />)}
                </HomeSectionLayout>

            </div>
        </div>
    )
}

export default HomeCategories