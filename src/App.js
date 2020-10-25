import React,{useState,useEffect} from "react";

import "./styles.css";

import api from './services/api'


function App() {

  const [repositories,setRepositories] = useState([]);
  
  useEffect(()=>{
    handleGetRepositories();
  },[]);

  async function handleGetRepositories(){
    const {data: repositories} = await api.get('/repositories');

    setRepositories(repositories);

  }

  async function handleAddRepository() {
   
    const {data: repository} = await api.post('/repositories',{
      url: "https://github.com/josepholiveira",
      title: `Novo Projeto - ${Date.now()}`,
      techs: ["React", "Node.js"],
    })

    setRepositories([...repositories,repository])
  
  }
   
  async function handleRemoveRepository(id) {
     await api.delete(`/repositories/${id}`);

     const repositoryIndex =  repositories.findIndex(repository => repository.id === id);

     repositories.slice(0,repositoryIndex)

     setRepositories([...repositories.slice(0,repositoryIndex),...repositories.slice(repositoryIndex+1,repositories.length)])
   
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => {
            return (
              <li key={repository.id}>
             {repository.title}
    
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
            )
          } )
        }
       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
