function PostAction({ icon, text, onClick }) {
  return (
    <div>
      <button onClick={onClick} className="flex gap-x-1 items-center">
        <span>{icon}</span>
        <span>{text}</span>
      </button>
    </div>
  );
}

export default PostAction;
