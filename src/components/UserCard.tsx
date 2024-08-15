import { memo } from "react";
import { useUserStore } from "../store/userStore";
import { User } from '../store/userStore';

function UserCard({ user }: { user: User }) {
    const setSelectedUser = useUserStore(state => state.setSelectedUser);
    const selectedUser = useUserStore(state => state.selectedUser);

    const handleClick = () => {
        setSelectedUser(user);
    };

    const isSelected = selectedUser === user;

    return (
        <div className={`border-b-2 border-slate-200 cursor-pointer bg-${isSelected ? 'slate-200' : 'transparent'}`} onClick={handleClick} >
            <div className='py-4 px-6'>
                <h3 className='text-xl font-medium mb-2'>{user.name.first} {user.name.last}</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellendus enim accusantium modi sapiente saepe hic quae
                    Repellendus enim accusantium modi sapiente saepe hic quae
                </p>
            </div>
        </div>
    )
}

export default memo(UserCard);