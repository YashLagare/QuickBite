import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../App';
import { setMyOrders } from '../redux/userSlice';

function useGetMyOrders() {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const result = await axios.get(`${serverUrl}/api/order/my-orders`, { 
          withCredentials: true 
        });
        dispatch(setMyOrders(result.data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    
    if (userData) {
      fetchOrders();
    }
  }, [userData, dispatch]);

  return { loading };
}

export default useGetMyOrders;