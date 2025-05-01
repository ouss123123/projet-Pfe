import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Platform</h1>
          <p className="text-xl mb-8">Discover amazing features and possibilities</p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-1 transition duration-300">
              <div className="text-indigo-600 text-4xl mb-4">
                <i className="fas fa-rocket"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Fast & Efficient</h3>
              <p className="text-gray-600">Lightning-fast performance for your needs</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-1 transition duration-300">
              <div className="text-indigo-600 text-4xl mb-4">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure</h3>
              <p className="text-gray-600">Your data is safe with us</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-1 transition duration-300">
              <div className="text-indigo-600 text-4xl mb-4">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Community</h3>
              <p className="text-gray-600">Join our growing community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-900 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-400 mb-8">Join thousands of satisfied users today</p>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300">
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home