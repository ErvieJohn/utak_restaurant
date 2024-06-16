import { get, getDatabase, ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import app from '../../config';
import { defaultItemValues } from '../../defaultItems';
import '../Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faSave } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

function EditItem({fetchNewItem, closeEditModal, editID}) {
    const [inputItem, setInputItem] = useState(defaultItemValues);
    const [oldItemData, setOldItemData] = useState(defaultItemValues);
    const itemID = editID;

    const handleInputChange = (key, event) => {
        setInputItem({
            ...inputItem,
            [key]: event.target.value
        });
    };

    const handleEditItem = () => {
        // console.log("Input Item: ", inputItem);
        editItem();
    }

    const editItem = async () => {
        const db = getDatabase(app);
        const newItemRef = ref(db, 'items/' + itemID);

        // Add created date and updated date to item
        const date = new Date();
        let item = {...inputItem};
        item["date_updated"] = date.toString();

        // String to integer
        item["price"] = parseInt(item["price"]);
        item["cost"] = parseInt(item["cost"]);
        item["stock_no"] = parseInt(item["stock_no"]);
        // console.log("item: ", item);
        

        set(newItemRef, item).then(()=>{
            setInputItem(defaultItemValues);
            fetchNewItem();
            closeEditModal();
            toast(`${item["name"]} has been successfully updated!`);
            // alert("Item Added");
        }).catch((error)=>{
           console.log(`Error: ${error}`);
        });
    }

    const checkFieldFill = () => {
        if(Object.values(inputItem).includes(null) || Object.values(inputItem).includes('') || JSON.stringify(inputItem) === JSON.stringify(oldItemData)){
            return true
        } else {
            return false
        }
    }

    useEffect(()=>{
        const fetchEditItemData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, 'items/' + itemID);
            const snapshot = await get(dbRef);
      
            if(snapshot.exists()){
                var temp = snapshot.val();
                // String to integer
                temp["price"] = temp["price"].toString();
                temp["cost"] = temp["cost"].toString();
                temp["stock_no"] = temp["stock_no"].toString();

                const data = temp;
                setInputItem(data);
                setOldItemData(data);
            } else {
                setInputItem(defaultItemValues);
            }
        };

        fetchEditItemData();
    }, [itemID]);

    return (
        <div className="modal">
            <div 
                // onClick={closeEditModal} 
                className="overlay">
            </div>
            <div className="modal-content">
                <button className="close-modal" onClick={closeEditModal}>
                    X
                </button>

                <h5 className='modal-text-header'>Edit Item</h5>
                <br/>
                <hr/>

                <div className='display-col'>
                    {/* Category Input */}
                    <label htmlFor='category' className='text-label'>Category</label>
                    <input
                        type="text"
                        className='text-input'
                        id='category'
                        placeholder='Category'
                        value={inputItem["category"]}
                        onChange={(event) => handleInputChange("category", event)}
                    />
                    

                    {/* Name Input */}
                    <label htmlFor='name' className='text-label'>Name</label>
                    <input
                        type="text"
                        className='text-input'
                        id='name'
                        placeholder='Name'
                        value={inputItem["name"]}
                        onChange={(event) => handleInputChange("name", event)}
                    />

                    {/* Size Input */}
                    <label htmlFor='custom-select' className='text-label'>Size</label>
                    <div className='custom-select'>
                        <select 
                            id='size'
                            value={inputItem["size"]} 
                            onChange={(event) => handleInputChange("size", event)}
                        >
                            <option value="" disabled>Select size</option>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Lage">Large</option>
                        </select>
                    </div>
                    

                    {/* Price Input */}
                    <label htmlFor='price' className='text-label'>Price</label>
                    <input
                        type="number"
                        className='text-input'
                        id='price'
                        placeholder='Price'
                        value={inputItem["price"]}
                        onChange={(event) => handleInputChange("price", event)}
                    />

                    {/* Cost Input */}
                    <label htmlFor='cost' className='text-label'>Cost</label>
                    <input
                        type="number"
                        className='text-input'
                        id='cost'
                        placeholder='Cost'
                        value={inputItem["cost"]}
                        onChange={(event) => handleInputChange("cost", event)}
                    />

                    {/* Stock No Input */}
                    <label htmlFor='stock_no' className='text-label'>Amount in stock</label>
                    <input
                        type="number"
                        className='text-input'
                        id='stock_no'
                        placeholder='Amount in stock'
                        value={inputItem["stock_no"]}
                        onChange={(event) => handleInputChange("stock_no", event)}
                    />

                </div>
                
                <br/>
                
                <div>
                    <button className='btn' onClick={closeEditModal} style={{marginRight: "20px", backgroundColor: "crimson", color: "#fff"}}>
                        <FontAwesomeIcon icon={faCancel}/>
                        {"  "} Cancel
                    </button>
                    <button className='btn' onClick={handleEditItem} 
                        disabled={checkFieldFill()}
                        style={{color: "#fff", backgroundColor: checkFieldFill() ? "#333333" : "cornflowerblue", 
                            cursor: checkFieldFill() ? "auto" : "pointer"
                        }}
                    >
                        <FontAwesomeIcon icon={faSave}/>
                        {"  "} Save
                    </button>
                </div>

            </div>
        </div>
    )
}

export default EditItem