import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { setMyShopData } from '../redux/ownerSlice';

function OwnerItemCard({ data }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleDelete = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/item/delete/${data._id}`, { withCredentials: true })
      dispatch(setMyShopData(result.data))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex h-[140px] sm:h-[150px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md group'>

      {/* Image Section */}
      <div className='relative w-28 sm:w-32 md:w-36 h-full flex-shrink-0 bg-gray-100 overflow-hidden'>
        <img
          src={data.image}
          alt={data.name}
          className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-105'
        />
        {/* Subtle overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none'></div>
      </div>

      {/* Content Section */}
      <div className='flex flex-col justify-between flex-1 p-3 sm:p-4 min-w-0'>

        {/* Top Section - Info */}
        <div className='space-y-2'>
          {/* Item Name */}
          <h3 className='text-sm sm:text-base font-semibold text-gray-900 truncate pr-2'>
            {data.name}
          </h3>

          {/* Badges */}
          <div className='flex flex-wrap gap-1.5'>
            <span className='inline-flex items-center px-2 py-0.5 rounded-md bg-orange-50 text-orange-600 text-xs font-medium'>
              {data.category}
            </span>
            <span className='inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-xs font-medium'>
              {data.foodType}
            </span>
          </div>
        </div>

        {/* Bottom Section - Price & Actions */}
        <div className='flex items-center justify-between mt-3 pt-3 border-t border-gray-100'>
          {/* Price */}
          <div className='text-lg sm:text-xl font-bold text-gray-900'>
            ₹{data.price}
          </div>

          {/* Action Buttons */}
          <div className='flex items-center gap-2'>
            {/* Edit Button */}
            <button
              className='p-1.5 sm:p-2 rounded-lg bg-orange-50 text-orange-600 transition-all duration-200 hover:bg-orange-100 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-1'
              onClick={() => navigate(`/edit-item/${data._id}`)}
              aria-label={`Edit ${data.name}`}
            >
              <Pencil className="w-4 h-4" strokeWidth={2} />
            </button>

            {/* Delete Button */}
            <button
              className='p-1.5 sm:p-2 rounded-lg bg-red-50 text-red-600 transition-all duration-200 hover:bg-red-100 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-1'
              onClick={handleDelete}
              aria-label={`Delete ${data.name}`}
            >
              <Trash2 className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OwnerItemCard