import { useState, useEffect } from 'react';
import { Card, Dimmer, Loader, Select} from 'semantic-ui-react';

import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [priceData, setPriceData] = useState(null);
  const [currency, setCurrency] = useState("GBP");

  const options = [
    {value: 'USD', text: 'USD'},
    {value: 'EUR', text: 'EUR'},
    {value: 'GBP', text: 'GBP'}
  ];

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
      const data = await res.json();
      setPriceData(data.bpi);
      setLoading(false);
    }
    fetchData();
  }, [])

  const handleSelect = (e, data) => {
    setCurrency(data.value)
  } 

  return (
    <div className="App">
        <div className="nav" style={{ padding: 15, backgroundColor: 'gold' }}>
            Coindesk API Data
        </div>
        {
          loading ? (
            <div>
              <Dimmer active inverted>
                  <Loader>Loading</Loader>
              </Dimmer>
            </div>
          ) : (
            <>
              <div className="price-container" style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: 600,
                height: 300,
                margin: '0 auto'
              }}>
                <div className="form">
                  <Select placeholder="Select your currency" 
                          onChange={handleSelect} 
                          options={options}>
                  </Select>
                </div>
                <div className='price'>
                  <Card>
                    <Card.Content>
                      <Card.Header>{currency} Price</Card.Header>
                      <Card.Description>{priceData[currency].rate}</Card.Description>
                    </Card.Content>
                  </Card>
              </div>
              </div>
            </>
          )
        }
    </div>
  );
}

export default App;
