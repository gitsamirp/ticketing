import Link from 'next/link';

const header = ({ currentUser }) => {
    return <nav className="navbar navbar-light bg-light">
        <Link href="/">
            <a className='navbar-brand'>Flight Tickets</a>
        </Link>

        <div className='d-flex justify-content-end'>
            <ul className='nav d-flex align-items-center'>
                { currentUser ? 'Sign Out' : 'Sign In' }
            </ul>
        </div>
    </nav>
};


export default Header;