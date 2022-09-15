import {
  Form,
  Button,
  Table,
  Modal
} from 'react-bootstrap'
import { useRef, useState } from 'react'

function App() {
  const [repoData, setRepoData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [detailRepo, setDetailRepo] = useState({})
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(0)
  const [itemPerPage] = useState(5)
  console.log(maxPage)



  const inputUsername = useRef()

  const onSearch = () => {
    fetch(`https://api.github.com/users/${inputUsername.current.value}/repos`)
      .then(res => res.json())
      .then(data => {
        setRepoData(data)
        setMaxPage(Math.ceil(data.length) / itemPerPage)
      })
  }

  const showTableBody = () => {
    let beginIndex = (page - 1) * itemPerPage
    let currentRepo = repoData.slice(beginIndex, beginIndex + itemPerPage)
    return (
      <tbody>
        {currentRepo.map(item => {
          return (
            <tr key={item.id} onClick={() => onDetail(item)}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.language}</td>
            </tr>
          )
        })}
      </tbody>
    )
  }

  const onNext = () => {
    setPage(page + 1 )
  }

  const onPrev = () => {
    setPage(page - 1)
  }

  const onDetail = (item) => {
    setShowModal(true)
    setDetailRepo(item)
  }

  return (
    <div style={{margin:'5rem'}}>
      <Form style={{marginLeft:'auto', marginRight:'auto', width:'50%', marginBottom:'2%'}}>
        <Form.Group>
          <Form.Label style={{fontWeight:'bold'}}>Input Github Username</Form.Label>
          <Form.Control type="text" placeholder="Github Username" ref={inputUsername} />
        </Form.Group>
        <Button style={{width:'100%', marginTop:'2%'}} variant="primary" onClick={onSearch}>
          Search
        </Button>
      </Form>
      <Table bordered striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Repository Name</th>
            <th>Language</th>
          </tr>
        </thead>
        {showTableBody()}
      </Table>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2%' }}>
        <Button disabled={page <= 1 ? true : false} onClick={onPrev}>prev</Button>
        <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>Page {page} of {maxPage}</div>
        <Button disabled={page >= maxPage ? true : false} onClick={onNext}>next</Button>
      </div>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Repository Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{detailRepo.name}</h4>
          <div>ID: {detailRepo.id}</div>
          <div>Language: {detailRepo.id}</div>
          <div>Description: {detailRepo.description}</div>
          <div>Created: {detailRepo.created_at}</div>
          <div>Last Update: {detailRepo.updated_at}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
