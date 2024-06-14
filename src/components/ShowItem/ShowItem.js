import { getDatabase, ref, remove } from 'firebase/database';
import React from 'react';
import app from '../../config';


function ShowItem({data, fetchNewItem}) {
    const items = data;

    const deleteItem = async (itemID) => {
        const db = getDatabase(app);
        const dbRef = ref(db, 'items/' + itemID);
        await remove(dbRef);
        fetchNewItem();
    }

    return (
        <div>
            {items ? (
                <ul>
                    {items.map((item, index)=>(
                        <li key={item.id + "-" +index}>
                            {item.name}
                            <button onClick={()=>deleteItem(item.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <h2>No item</h2>
            )}
        </div>
    )
}

export default ShowItem