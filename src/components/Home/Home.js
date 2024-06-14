import React, { useEffect, useState } from 'react';
import app from '../../config';
import { getDatabase, ref, get } from 'firebase/database';
import './Home.css';
import ShowItem from '../ShowItem/ShowItem';
import AddItem from '../AddItem/AddItem';

function Home() {
  const [items,setItems] = useState(null);

  const fetchItemData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, 'items');
      const snapshot = await get(dbRef);

      if(snapshot.exists()){
        const data = snapshot.val();
        const tmpArray = Object.keys(data).map((item)=>{
          return {
            ...data[item],
            id: item
          }
        })
        // console.log("data: ", Object.values(snapshot.val()));
        setItems(Object.values(tmpArray));
      } else {
        setItems(null);
      }
  }  

  useEffect(()=>{
      fetchItemData();
  }, []);

  return (
    <div>
      Home
      <AddItem fetchNewItem={fetchItemData}/>
      <ShowItem data={items} fetchNewItem={fetchItemData}/>
    </div>
  )
}

export default Home