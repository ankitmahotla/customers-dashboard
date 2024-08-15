import './App.css';
import Users from './components/Users';
import PhotoGallery from './components/PhotoGallery';
import { useUserStore } from './store/userStore';
import { LoaderCircle } from 'lucide-react';

function App() {
  const selectedUser = useUserStore(state => state.selectedUser);

  return (
    <div className="grid grid-cols-[25%_75%] gap-5 w-full max-w-[100vw] overflow-x-hidden">
      <Users />
      <div className='flex flex-col items-center py-6 md:py-10 md:px-20 overflow-y-auto max-h-[100vh]'>
        {selectedUser !== null ?
          <>
            <h1 className='text-center text-2xl font-medium'>
              {selectedUser?.name?.title} {selectedUser?.name.first} {selectedUser?.name.last}
            </h1>
            <p>{selectedUser?.location?.street?.number} {selectedUser?.location?.street?.name}, {selectedUser?.location?.city}, {selectedUser?.location?.state}, {selectedUser?.location?.country}</p>
            <p className='break-words max-w-[100%] mt-4'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Atque quidem quas, earum consectetur labore hic alias
              assumenda blanditiis veniam sequi rem inventore id debitis
              nihil odio illo necessitatibus laboriosam aliquam?
              assumenda blanditiis veniam sequi rem inventore id debitis
              nihil odio illo necessitatibus laboriosam aliquam?
            </p>
            <PhotoGallery photoPage={selectedUser?.photoPage} />
          </> : <LoaderCircle className='animate-spin' />
        }
      </div>
    </div>
  );
}

export default App;