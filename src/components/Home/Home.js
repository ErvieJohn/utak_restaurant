import React, { useEffect, useState } from 'react';
import app from '../../config';
import { getDatabase, ref, get } from 'firebase/database';
import './Home.css';
import ShowItem from '../ShowItem/ShowItem';
import AddItem from '../AddItem/AddItem';
import EditItem from '../EditItem/EditItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteItem from '../DeleteItem/DeleteItem';

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

  // for modal
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [editID, setEditID] = useState(null);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [deleteName, setDeleteName] = useState(null);

  const openAddModal = () =>{
    setIsAddVisible(true);
  }

  const closeAddModal = () =>{
    setIsAddVisible(false);
  }

  const openEditModal = (itemID) =>{
    setIsEditVisible(true);
    setEditID(itemID);
  }

  const closeEditModal = () =>{
    setIsEditVisible(false);
    setEditID(null);
  }

  const openDeleteModal = (deleteID, deleteName) =>{
    setIsDeleteVisible(true);
    setDeleteID(deleteID);
    setDeleteName(deleteName);
  }

  const closeDeleteModal = () =>{
    setIsDeleteVisible(false);
    setDeleteID(null);
    setDeleteName(null);
  }

  if(isAddVisible || isEditVisible || isDeleteVisible) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  useEffect(()=>{
      fetchItemData();
  }, []);

  return (
    <div className='App-header'>
      {/* Simple UTAK Test -  */}
      

      <div style={{display: "flex",
                  justifyContent: "space-between",
                  width: "70%",}}>
        <div>
          Restaurant Sales Tracker
        </div>
        <button className='btn' style={{backgroundColor: "green", color: "white"}} onClick={openAddModal}>
          <FontAwesomeIcon icon={faAdd}/>
          {"  "} ADD
        </button>

      </div>
      
      <ShowItem data={items} openEditModal={openEditModal} openDeleteModal={openDeleteModal}/>

      {isAddVisible && <AddItem fetchNewItem={fetchItemData} closeAddModal={closeAddModal}/>}
      {isEditVisible && <EditItem fetchNewItem={fetchItemData} closeEditModal={closeEditModal} editID={editID}/>}
      {isDeleteVisible && <DeleteItem fetchNewItem={fetchItemData} closeDeleteModal={closeDeleteModal} deleteID={deleteID} deleteName={deleteName}/>}
      <ToastContainer style={{fontSize: "16px"}}/>
      <br/>
      <div style={{color: "#fff", fontSize: "1.2rem"}}>
        <b>
          Source Code: {" "}
        </b>
        <a style={{color: "#fff"}} href='https://github.com/ErvieJohn/utak_restaurant' target='_blank' rel="noreferrer">https://github.com/ErvieJohn/utak_restaurant</a>
      </div>
    </div>
  )
}

export default Home