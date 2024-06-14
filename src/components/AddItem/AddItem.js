import { getDatabase, push, ref, set } from 'firebase/database';
import React, { useState } from 'react';
import app from '../../config';
import { defaultItemValues } from '../../defaultItems';

function AddItem({fetchNewItem}) {
    const [inputItem, setInputItem] = useState(defaultItemValues);

    const handleInputChange = (key, event) => {
        setInputItem({
          ...inputItem,
          [key]: event.target.value
        });
    };

    const handleAddItem = () => {
        // console.log("Input Item: ", inputItem);
        addItem();
        fetchNewItem();
    }

    const addItem = async () => {
        const db = getDatabase(app);
        const newItemRef = push(ref(db, 'items'));

        // Add created date and updated date to item
        const date = new Date();
        let item = {...inputItem};
        item["date_created"] = date.toString();
        item["date_updated"] = date.toString();
        // console.log("item: ", item);

        set(newItemRef, item).then(()=>{
            setInputItem(defaultItemValues);
            fetchNewItem();
            alert("Item Added");
        }).catch((error)=>{
           console.log(`Error: ${error}`);
        });
    }

    return (
        <div>
            {/* Category Input */}
            <input
                type="text"
                value={inputItem["category"]}
                onChange={(event) => handleInputChange("category", event)}
            />

            {/* Name Input */}
            <input
                type="text"
                value={inputItem["name"]}
                onChange={(event) => handleInputChange("name", event)}
            />

            {/* Size Input */}
            <select 
                value={inputItem["size"]} 
                onChange={(event) => handleInputChange("size", event)}
            >
                <option value="" disabled>Select size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Lage">Large</option>
            </select>

            {/* Price Input */}
            <input
                type="number"
                value={inputItem["price"]}
                onChange={(event) => handleInputChange("price", event)}
            />

            {/* Cost Input */}
            <input
                type="number"
                value={inputItem["cost"]}
                onChange={(event) => handleInputChange("cost", event)}
            />

            {/* Stock No Input */}
            <input
                type="number"
                value={inputItem["stock_no"]}
                onChange={(event) => handleInputChange("stock_no", event)}
            />

            <button onClick={handleAddItem}>Add</button>
        </div>
    )
}

export default AddItem