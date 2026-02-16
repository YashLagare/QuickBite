import { useEffect, useState } from 'react';
import { FaCircleCheck } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function OrderPlaced() {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    // Trigger content animation
    setTimeout(() => setShowContent(true), 100);

    // Generate confetti
    const confettiArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      color: ['#ff6b4a', '#ff8f6b', '#ffa07a', '#ffb347', '#ffd700'][Math.floor(Math.random() * 5)]
    }));
    setConfetti(confettiArray);

    // Auto redirect after 10 seconds
    const timer = setTimeout(() => {
      navigate("/my-orders");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#fff7f3] via-[#fffdfb] to-[#ffece6] flex flex-col justify-center items-center px-4 text-center relative overflow-hidden'>

      {/* Confetti Effect */}
      {confetti.map((item) => (
        <div
          key={item.id}
          className='absolute w-2 h-2 rounded-full animate-fall'
          style={{
            left: `${item.left}%`,
            backgroundColor: item.color,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`
          }}
        />
      ))}

      {/* Main Content Card */}
      <div className={`relative z-10 transform transition-all duration-700 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>

        <div className='bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 sm:p-10 border border-gray-100 max-w-lg mx-auto relative'>

          {/* Success Icon - Top Center */}
          <div className='absolute -top-12 left-1/2 -translate-x-1/2'>
            <div className='bg-green-500 rounded-full p-5 shadow-lg'>
              <FaCircleCheck className='text-white text-5xl' />
            </div>
          </div>

          {/* Content with top padding for icon */}
          <div className='pt-8'>
            <h1 className='text-3xl sm:text-4xl font-bold text-[#2d2d2d] mb-3'>
              Order Placed Successfully! 🎉
            </h1>

            <p className='text-gray-600 text-base sm:text-lg mb-6 leading-relaxed'>
              Thank you for your order! Your delicious food is being prepared with care.
              You can track your order status in real-time.
            </p>

            {/* Order Info Card */}
            <div className='bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 mb-6 border border-orange-100'>
              <div className='flex items-center justify-center gap-3 mb-3'>
                <MdDeliveryDining className='text-orange-600 text-3xl' />
                <div className='text-left'>
                  <p className='text-sm text-gray-600 font-medium'>Estimated Delivery</p>
                  <p className='text-lg font-bold text-orange-600'>30-45 minutes</p>
                </div>
              </div>
              <p className='text-xs text-gray-500 text-center'>
                We'll notify you when your order is on the way
              </p>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-3'>
              <button
                className='flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300 ease-out flex items-center justify-center gap-2'
                onClick={() => navigate("/my-orders")}
              >
                <span>My Orders☺️</span>
                <span>→</span>
              </button>

              <button
                className='flex-1 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3.5 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 ease-out'
                onClick={() => navigate("/")}
              >
                Browse More🫣
              </button>
            </div>
          </div>
        </div>

        {/* Auto Redirect Notice */}
        <p className='text-xs text-gray-400 mt-6'>
          Redirecting to orders page in 10 seconds...
        </p>
      </div>

      {/* Decorative Elements */}
      <div className='absolute top-10 left-10 w-20 h-20 bg-orange-200 rounded-full blur-3xl opacity-30 animate-float'></div>
      <div className='absolute bottom-10 right-10 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-30 animate-float-delayed'></div>

      {/* Custom Animations */}
      <style jsx>{`
                @keyframes fall {
                    0% {
                        transform: translateY(-100vh) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }

                @keyframes bounce-once {
                    0%, 100% {
                        transform: scale(1);
                    }
                    25% {
                        transform: scale(1.1);
                    }
                    50% {
                        transform: scale(0.95);
                    }
                    75% {
                        transform: scale(1.05);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                @keyframes float-delayed {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-30px);
                    }
                }

                .animate-fall {
                    animation: fall linear infinite;
                }

                .animate-bounce-once {
                    animation: bounce-once 0.6s ease-out;
                }

                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                .animate-float-delayed {
                    animation: float-delayed 4s ease-in-out infinite;
                    animation-delay: 1s;
                }
            `}</style>
    </div>
  );
}

export default OrderPlaced;