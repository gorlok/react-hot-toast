import toast, { Toaster } from 'react-hot-toast'

import { useState } from 'react'


export default function App() {

  const [isSuccess, setIsSuccess] = useState(Math.random() > 0.5);

  const notify = () => toast('Here is your toast.')

  const fetchData = async () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        setIsSuccess(v => !v);
        console.log('isSuccess', isSuccess);
        if (isSuccess) resolve('Data fetched successfully')
        else reject(new Error('Failed to fetch data'))
      }, 2000);
    });

  function testPromise() {
    const myPromise = fetchData();

    toast.promise(
      async () => await myPromise,
      {
        loading: 'Loading',
        success: 'Got the data',
        error: 'Error when fetching',
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 5000,
          icon: '🔥',
        },
      }
    ).then(() => {
      console.log('Promise resolved');
    }).catch(() => {
      console.log('Promise rejected');
    });
  }

  function testLoading() {
    const id = toast.loading('Loading...');

    setTimeout(() => {
      toast.dismiss(id);
    }, 3000);
  }


  return (
    <div className='tests'>
      <nav>
        <button onClick={notify}>Make me a toast</button>
        <button onClick={() => toast.success('Success!')}>Success</button>
        <button onClick={() => toast.error('Error!')}>Error</button>
        <button onClick={() => toast.loading('Loading...', { duration: 2000 })}>Loading</button>
        <button onClick={() => testLoading()}>test loading</button>
        <button onClick={() => testPromise()}>test promise</button>
      </nav>

      <Toaster
        toastOptions={{
          className: '',
          style: {
            borderRadius: '10px',
            background: '#444',
            color: '#fff',
          },          
        }}
      />      
    </div>
  );
};