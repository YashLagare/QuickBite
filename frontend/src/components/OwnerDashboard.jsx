import { MapPin, Pencil, Plus, Store, UtensilsCrossed } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Nav from './Nav'
import OwnerItemCard from './OwnerItemCard'

function OwnerDashboard() {
  const { myShopData } = useSelector(state => state.owner)
  const navigate = useNavigate()

  return (
    <div className='w-full bg-gradient-to-br from-[#fff7f3] via-[#fffdfb] to-[#ffece6]'>
      {/* Ambient Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute top-60 -left-20 w-60 h-60 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-20 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl" />
      </div>

      <Nav />

      {/* No Shop - Onboarding Empty State */}
      {!myShopData && (
        <div className='relative flex justify-center items-center min-h-[calc(100vh-5rem)] px-4 pt-20 pb-8'>
          {/* Background Glow */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-[600px] h-[600px] bg-gradient-to-r from-orange-200/20 to-amber-200/20 rounded-full blur-3xl" />
          </div>

          <div className='relative w-full max-w-md bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-8 sm:p-10'>
            {/* Decorative Corner Accents */}
            <div className="absolute -top-2 -left-2 w-24 h-24 bg-gradient-to-br from-[#ff4d2d]/10 to-transparent rounded-tl-3xl" />
            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-tl from-[#ff6b4a]/10 to-transparent rounded-br-3xl" />

            {/* Icon */}
            <div className='flex justify-center mb-6'>
              <div className='relative'>
                <div className="absolute inset-0 bg-[#ff4d2d]/20 rounded-xl blur-md" />
                <div className='relative w-20 h-20 bg-gradient-to-br from-[#ff4d2d] via-[#ff6b4a] to-[#ff8a6a] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30'>
                  <Store className='text-white w-9 h-9' strokeWidth={1.8} />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className='text-center space-y-3'>
              <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight'>
                Welcome to QuickBite
              </h1>
              <p className='text-gray-600 text-base leading-relaxed max-w-sm mx-auto'>
                Start your journey by adding your restaurant. Reach thousands of hungry customers today.
              </p>
            </div>

            {/* CTA Button */}
            <button
              className='w-full mt-8 bg-gradient-to-r from-[#ff4d2d] via-[#ff6b4a] to-[#ff8a6a] text-white px-6 py-4 rounded-xl font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[#fff7f3]'
              onClick={() => navigate("/create-edit-shop")}
              aria-label="Create your restaurant"
            >
              Create Your Restaurant
            </button>

            {/* Help Text */}
            <p className='text-center text-sm text-gray-500 mt-4 font-medium'>
              Takes less than 2 minutes to set up ✨
            </p>
          </div>
        </div>
      )}

      {/* Has Shop - Dashboard View */}
      {myShopData && (
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-8'>


          {/* Shop Details Card */}
          <div className='group relative'>
            {/* Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#ff4d2d]/20 to-[#ff6b4a]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className='relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 overflow-hidden'>

              {/* Hero Image Section */}
              <div className='relative h-56 sm:h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50'>
                <img
                  src={myShopData.image}
                  alt={myShopData.name}
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                />
                {/* Elegant Overlay Gradient */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent' />

                {/* Restaurant Name on Image */}
                <div className='absolute bottom-0 left-0 right-0 p-6'>
                  <h2 className='text-2xl sm:text-3xl font-bold text-white drop-shadow-lg tracking-tight'>
                    {myShopData.name}
                  </h2>
                </div>

                {/* Edit Button - Premium Glass Style */}
                <button
                  className='absolute top-4 right-4 bg-white/90 backdrop-blur-md text-gray-700 p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 border border-white/60 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2'
                  onClick={() => navigate("/create-edit-shop")}
                  aria-label="Edit restaurant details"
                >
                  <Pencil className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>

              {/* Restaurant Info Section */}
              <div className='p-5 sm:p-6'>
                <div className='flex flex-col sm:flex-row sm:items-center gap-4 text-gray-700'>
                  {/* Location */}
                  <div className='flex items-center gap-2.5'>
                    <div className='p-2 bg-gradient-to-br from-orange-50 to-amber-50/80 rounded-lg'>
                      <MapPin className="w-4 h-4 text-orange-500" strokeWidth={2} />
                    </div>
                    <span className='text-sm font-medium'>
                      {myShopData.city}, {myShopData.state}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className='hidden sm:block w-px h-5 bg-gradient-to-b from-orange-200/60 to-transparent'></div>

                  {/* Address */}
                  <div className='flex items-start gap-2.5 flex-1'>
                    <span className='text-sm text-gray-600 leading-relaxed'>
                      {myShopData.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* No Items - Empty State */}
          {myShopData.items.length === 0 && (
            <div className='relative flex justify-center py-8'>
              {/* Background Glow */}
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-[400px] h-[400px] bg-gradient-to-r from-orange-100/30 to-amber-100/30 rounded-full blur-3xl" />
              </div>

              <div className='relative w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-8 sm:p-10'>

                {/* Icon */}
                <div className='flex justify-center mb-6'>
                  <div className='relative'>
                    <div className="absolute inset-0 bg-orange-200/30 rounded-2xl blur-md" />
                    <div className='relative w-16 h-16 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl flex items-center justify-center border border-orange-200/60'>
                      <UtensilsCrossed className='text-orange-500 w-8 h-8' strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className='text-center space-y-2'>
                  <h3 className='text-xl font-bold text-gray-900'>
                    Add Your First Dish
                  </h3>
                  <p className='text-gray-600 text-base leading-relaxed max-w-md mx-auto'>
                    Start building your menu and showcase your delicious creations to hungry customers.
                  </p>
                </div>

                {/* CTA */}
                <button
                  className='w-full mt-6 bg-gradient-to-r from-[#ff4d2d] via-[#ff6b4a] to-[#ff8a6a] text-white px-6 py-4 rounded-xl font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[#fff7f3]'
                  onClick={() => navigate("/add-item")}
                  aria-label="Add your first menu item"
                >
                  Add Menu Item
                </button>
              </div>
            </div>
          )}

          {/* Items Section - Has Items */}
          {myShopData.items.length > 0 && (
            <div className='space-y-6'>

              {/* Section Header */}
              <div className='bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/60 p-5'>
                <div className='flex items-center justify-between flex-wrap gap-4'>
                  <div>
                    <h2 className='text-xl font-bold text-gray-900'>
                      Your Menu
                    </h2>
                    <p className='text-sm text-orange-600/70 mt-1 font-medium'>
                      {myShopData.items.length} {myShopData.items.length === 1 ? 'item' : 'items'} available
                    </p>
                  </div>

                  <button
                    className='flex items-center gap-2 bg-gradient-to-r from-[#ff4d2d] via-[#ff6b4a] to-[#ff8a6a] text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff7f3]'
                    onClick={() => navigate("/add-item")}
                    aria-label="Add new menu item"
                  >
                    <Plus className="w-5 h-5" strokeWidth={2.5} />
                    <span className='hidden sm:inline'>Add Item</span>
                  </button>
                </div>
              </div>

              {/* Items Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {myShopData.items.map((item, index) => (
                  <div key={index} className="transition-all duration-300 hover:-translate-y-1">
                    <OwnerItemCard data={item} />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  )
}

export default OwnerDashboard