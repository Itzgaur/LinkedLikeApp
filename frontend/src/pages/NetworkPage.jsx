function NetworkPage() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button>Show</button>
      {show && <p>This is modal</p>}
    </div>
  );
}

export default NetworkPage;
