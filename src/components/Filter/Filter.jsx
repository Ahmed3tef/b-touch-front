import React, { useEffect, useState } from 'react';
import Selector from '../Inputs/Selector';
import { loadFilterData, loadV_Model } from '../../store/reducers/filter';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Filter = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [agency, setAgency] = useState('');
  const [catId, setCatId] = useState('');


  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { FilterData, isLoading, error, v_model, v_agencies, v_years } = useSelector(state => state.filter)

  useEffect(() => {
    dispatch(loadFilterData());
  }, []);

  useEffect(() => {
    if (brand) dispatch(loadV_Model({ id: brand }));
  }, [brand]);

  const resetHandler = () => {
    setAgency('');
    setBrand('');
    setModel('');
    setYear('');
    setCatId('');
  }

  const searchHandler = () => {
    if (brand && model && year && agency && catId) navigate(`/products/${catId}?vehicle=${brand}&model=${model}&year=${year}&agency=${agency}`);
  }

  return (
    <div className="filter">
      <h2>Select Your Vehicle</h2>
      <div className="flex items-center justify-center w-full gap-8 filter-options 2xl:flex-col">
        <div className="selectors">

          <Selector data={FilterData?.vehiclesList} id={brand} setId={setBrand} path='filter' placeholder='Vehicle' />

          <Selector data={v_model} id={model} setId={setModel} path='filter' placeholder='Model' />

          <Selector data={v_years} id={year} setId={setYear} path='filter' placeholder='Year' name='year' />

          <Selector data={v_agencies} id={agency} setId={setAgency} path='filter' placeholder='Agency' />

          <Selector data={FilterData?.categoriesList} id={catId} setId={setCatId} path='filter' placeholder='Categories' />

        </div>
        <div className="xxl:mx-4 xxl:px-4 cta">
          <button className="anim-click" onClick={resetHandler}>Reset</button>
          <button className="anim-click" onClick={searchHandler}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
