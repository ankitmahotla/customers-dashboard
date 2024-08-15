import { memo, useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import { User } from '../store/userStore';

function UserCard({ user }: { user: User }) {
    const setSelectedUser = useUserStore(state => state.setSelectedUser);
    const selectedUser = useUserStore(state => state.selectedUser);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        setIsSelected(selectedUser?.photoPage === user.photoPage);
    }, [selectedUser, user.photoPage]);

    const handleClick = () => {
        setSelectedUser(user);
    };

    return (
        <div 
            className={`border-b-2 border-slate-200 cursor-pointer ${isSelected ? 'bg-slate-200' : 'bg-transparent'}`} 
            onClick={handleClick}
        >
            <div className='py-4 px-2 md:px-6'>
                <h3 className='text-lg md:text-xl font-medium mb-2'>{user.name.title} {user.name.first} {user.name.last}</h3>
            </div>
        </div>
    )
}

export default memo(UserCard);