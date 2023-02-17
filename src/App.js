import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GET, ADD, DELETE,UPDATE } from "./store";

function App() {
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const[id,setId]=useState()
  const [city, setCity] = useState();
  const [trigger, setTriger] = useState(false);
  const [isEdit, setIsEdit] = useState();

  const dispatch = useDispatch();
  const data1 = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(GET());
  }, []);

  const submit = async(e) => {
    e.preventDefault();
    let payload = {
      name: name,
      age: age,
      City: city,
    };
    console.log("before",data1)
    await dispatch(ADD(payload));
    console.log("after",data1)
    setName("")
    setAge("")
    setCity("")
  };

  const deleteData = (id) => {
    console.log(id)
    let payload = {
      id: id,
    };
    dispatch(DELETE(payload));
  };

  


  const editData = (data) => {
    console.log(data)
      // setIsEdit(data.id)
      setId(data.id)
      setName(data.name)
      setAge(data.age)
      setCity(data.City)
      setTriger(true)
  }

  const updatedata = (id)=>{
   

    let payload = {
      id:id,
      name: name,
      age: age,
      City: city,
    };
    console.log(payload.id)

    dispatch(UPDATE(payload))
    setName("")
    setAge("")
    setCity("")

    setTriger(false)

  }

  // const handleAdd = () => {
  //   dispatch(addCompany({ name: 'New Company', age: 0, city: 'New City' }));
  // };

  // const handleUpdate = (id, data) => {
  //   dispatch(updateCompany({ id, data }));
  // };

  // const handleDelete = (id) => {
  //   dispatch(deleteCompany(id));
  // };

  return (
    <div>
      <form
        action="#"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <input
          type="text"
          name="Name"
          label="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="Number"
          name="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          name="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {trigger?(
          <button  onClick={(e) => updatedata(id)}>update</button>
        ):(<button onClick={submit}>add</button>)}
        

      

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {data1?.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.age}</td>
                <td>{row.City}</td>

                <td>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      editData(row);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button 
                  onClick={(e) => deleteData(row.id)}
                  
                  >Delete</button>{" "}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </form>

      {/* <button onClick={handleAdd}>Add Company</button>
      {companies.map(company => (
        <div key={company.id}>
          <input
            value={company.name}
            onChange={e => handleUpdate(company.id, { name: e.target.value })}
          />
          <input
            value={company.age}
            onChange={e => handleUpdate(company.id, { age: e.target.value })}
          />
          <input
            value={company.city}
            onChange={e => handleUpdate(company.id, { city: e.target.value })}
          />
          <button onClick={() => handleDelete(company.id)}>Delete</button>
        </div>
      ))} */}
    </div>
  );
}

export default App;
