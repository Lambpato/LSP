import RegButton from "../components/RegButton"

export default function Welcome({handleRegister, handleLogIn, action}) {
  return (
    <div className='col mt-5'>
      <div className='welcome bg-light-subtle py-5 mx-5 rounded-5'>
        <h1 className='fs-1 fw-bold mb-5 text-center'>Welcome</h1>
        <div className='d-flex justify-content-center flex-column d-grid gap-2 col-6 mx-auto'>
          <RegButton handleClick={handleRegister} name={'Register'} />
          <RegButton handleClick={handleLogIn} name={'Log In'} />
        </div>
      </div>
    </div>
  )
};
