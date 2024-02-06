import { useState } from "react";
const WorkoutForm = () => {
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit= async(event)=>{
      event.preventDefault()

      const workout={title,load,reps}

      const response= await fetch('/api/workouts',{
          method:'POST',
          body: JSON.stringify(workout),
          headers:{
              'Content-Type':'application/json'
          }
      })

      const json = await response.json()

      if(!response.ok){
        setError(json.error)
      }
      if(response.ok){
          setError(null)
          setTitle('')
          setLoad('')
          setReps('')          
          console.log('new workout added ',json)
      }
  }

  return (
    <form className="create" onSubmit={handleSubmit} >
      <h3>Add a new Workout</h3>
       <label>Exercise</label>
        <input
         type="text"
         onChange={(event) => setTitle(event.target.value)}
         value={title}
        />
       <label>Load (in Kg)</label>
        <input
         type="number"
         onChange={(event) => setLoad(event.target.value)}
         value={load}
        />
       <label>No. of Reps</label>
        <input
         type="number"
         onChange={(event) => setReps(event.target.value)}
         value={reps}
        />
        <button >Add Workout</button>
  {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm
