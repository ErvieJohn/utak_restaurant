import React, { useEffect, useState } from 'react';
import './Home.css';
import app from '../../config';
import { getDatabase, ref, get } from 'firebase/database';

function Home() {

  const [items,setItems] = useState(null);

  const fetchItemData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, 'items');
    const snapshot = await get(dbRef);

    if(snapshot.exists()){
      console.log("data: ", Object.values(snapshot.val()));
      setItems(Object.values(snapshot.val()));
    }
  }
  

  useEffect(()=>{
    fetchItemData();
  }, [])

  return (
    <div>
      Home
      <ul>

        {items && items.map((item, index)=>(
          <li key={item.id + "-" +index}>
            {item.id} {item.name}
          </li>
        )
        )}
      </ul>
      
      
    </div>
  )
}

export default Home