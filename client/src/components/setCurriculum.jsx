import Curriculum from './curriculumVer'



const VerCurriculum = () => {

  return (
    <div className='flex items-center justify-center bg-zinc-100'>
      <div className='h-1/2'>
      <h1 className='text-center text-5xl mt-5 font-bold'>Currículum</h1>
      <div className='my-5 container mx-auto'>
        <Curriculum />
      </div>
      </div>
      <div className='h-1/2'>
        <button className='bg-purple-600 hover:bg-purple-400 p-2 w-80 m-5 rounded-lg text-white' onClick={() => navigate('/curriculums')}>
          Volver
        </button>
      </div>
    </div>

  )
}

export default VerCurriculum
