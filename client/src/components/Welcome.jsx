export default function Welcome({handleRegister, handleLogIn}) {
  return (
    <div className='col mt-5'>
      <div className='bg-light-subtle py-5 mx-5 rounded-5'>
        <h1 className='fs-1 fw-bold mb-5 text-center'>Welcome</h1>
        <div className='d-flex justify-content-center flex-column d-grid gap-2 col-6 mx-auto'>
          <RegButton handleClick={handleRegister} name={'Register'} />
          <RegButton handleClick={handleLogIn} name={'Log In'} />
        </div>
      </div>
    </div>
  )
};

function RegButton ({handleClick, name}) {

  return (
    <button className='rounded-pill mb-4 btn fw-semibold border border-dark' type="button" onClick={handleClick}>{name}</button>
  )
};
