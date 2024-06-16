import { getDatabase, ref, remove } from 'firebase/database';
import app from '../../config';
import '../Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

function DeleteItem({fetchNewItem, closeDeleteModal, deleteID, deleteName}) {
    const itemID = deleteID;
    const itemName = deleteName;

    const handleDeleteItem = () => {
        deleteItem();
    } 

    const deleteItem = async () => {
        console.log("ItemID: ", itemID);
        const db = getDatabase(app);
        const dbRef = ref(db, 'items/' + itemID);
        await remove(dbRef);
        fetchNewItem();
        closeDeleteModal();
        toast(`${itemName} has been successfully deleted!`);
    }

    return (
        <div className="modal">
            <div 
                // onClick={closeDeleteModal} 
                className="overlay">
            </div>
            <div className="modal-content">
                <button className="close-modal" onClick={closeDeleteModal}>
                    X
                </button>

                <h5 className='modal-text-header'>Delete Item</h5>
                <br/>
                <hr/>

                <div style={{fontSize: "20px"}}>
                    Are you sure you want to delete {deleteName}?
                </div>
                
                <br/>
                
                <div>
                    <button className='btn' onClick={closeDeleteModal} style={{marginRight: "20px", backgroundColor: "black", color: "#fff"}}>
                        <FontAwesomeIcon icon={faCancel}/>
                        {"  "} Cancel
                    </button>
                    <button className='btn' onClick={handleDeleteItem}
                        style={{color: "#fff", backgroundColor: "red"}}
                    >
                        <FontAwesomeIcon icon={faTrashCan}/>
                        {"  "} Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteItem