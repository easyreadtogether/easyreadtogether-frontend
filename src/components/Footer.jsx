import footer from '../data/footer.json'
import {
  PiFacebookLogo,
  PiTwitterLogo,
  PiLinkedinLogo,
  PiInstagramLogo
} from 'react-icons/pi'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='w-full bg-accent text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Footer Header */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12'>
          <div className='flex flex-col items-start space-y-4'>
            <Link to='/' className='flex items-center  gap-3'>
              <img
                src='/logo.png'
                alt='Elegance Coffee Logo'
                className='h-30 w-auto filter brightness-0 invert'
              />
            </Link>
            <p className='text-white/80 max-w-md'>
              Premium Ethiopian coffee exporters committed to quality and
              sustainability.
            </p>
          </div>

          <div className='flex flex-col md:flex-row gap-8 md:gap-16'>
            <div className='flex flex-col gap-2'>
              <h3 className='font-semibold text-lg text-white'>Contact Us</h3>
              <p className='text-white/80'>General Winget Street</p>
              <p className='text-white/80'>P.O. Box 122322</p>
              <p className='text-white/80'>Addis Ababa, Ethiopia</p>
              <p className='text-white/80'>export@eleganceet.com</p>
            </div>

            <div className='flex flex-col gap-2'>
              <h3 className='font-semibold text-lgtext-white text-white'>
                Follow Us
              </h3>
              <div className='flex gap-4'>
                <Link
                  to='https://facebook.com/elegancecoffee'
                  className='p-2 bg-primary/20 rounded-full text-white hover:bg-primary/30 transition-colors'
                  aria-label='Facebook'
                >
                  <PiFacebookLogo size={20} />
                </Link>
                <Link
                  to='https://twitter.com/elegancecoffee'
                  className='p-2 bg-primary/20 rounded-full text-white hover:bg-primary/30 transition-colors'
                  aria-label='Twitter'
                >
                  <PiTwitterLogo size={20} />
                </Link>
                <Link
                  to='https://instagram.com/elegancecoffee'
                  className='p-2 bg-primary/20 rounded-full text-white hover:bg-primary/30 transition-colors'
                  aria-label='Instagram'
                >
                  <PiInstagramLogo size={20} />
                </Link>
                <Link
                  to='https://linkedin.com/company/elegancecoffee'
                  className='p-2 bg-primary/20 rounded-full text-white hover:bg-primary/30 transition-colors'
                  aria-label='LinkedIn'
                >
                  <PiLinkedinLogo size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 border-t border-white/20 pt-12'>
          {footer.footerColumns.map((section, index) => (
            <div key={index} className='space-y-4'>
              <h3 className='font-semibold text-white text-lg'>
                {section.name}
              </h3>
              <ul className='space-y-3'>
                {section.links.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.to}
                      className='text-white/80 hover:text-white transition-colors'
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className='border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4'>
          <div className='text-white/80 text-sm'>
            &copy; {new Date().getFullYear()} ELEGAS Ethiopia Trading PLC. All
            rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
