const Person = ({ person, handleDelete }) => {
  return (
    <p>{person.name} {person.number} <button type="submit" onClick={() => handleDelete(person.id, person.name)}>delete</button></p>
  )
}

export default Person