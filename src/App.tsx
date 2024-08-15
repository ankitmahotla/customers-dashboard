import './App.css';
import Users from './components/Users';
import PhotoGallery from './components/PhotoGallery';
import { useUserStore } from './store/userStore';

function App() {
  const selectedUser = useUserStore(state => state.selectedUser);

  return (
    <div className="grid grid-cols-[25%_75%] gap-5 w-full max-w-[100vw] overflow-x-hidden">
      <Users />
      <div className='flex flex-col items-center py-6 md:py-10 md:px-20 overflow-y-auto max-h-[100vh]'>
        {selectedUser !== null &&
          <h1 className='text-center text-2xl font-medium'>
            {selectedUser?.name?.title} {selectedUser?.name.first} {selectedUser?.name.last}
          </h1>
        }
        <p className='break-words max-w-[100%]'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <PhotoGallery photoPage={selectedUser?.photoPage} />
      </div>
    </div>
  );
}

export default App;