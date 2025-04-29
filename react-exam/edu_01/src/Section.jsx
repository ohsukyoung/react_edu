export default function Section({
  bgColor = "white",
  color = "#777",
  title = "Component",
  children, // 컴포너틑 사이의 엘리먼트 혹은 컴포넌트를 받아오는 예약어
  onMouseEnter = (event) => {
    event.currentTarget.style.fontWeight = "900";
  },
}) {
  const sectionCss = {
    backgroundColor: bgColor,
    color, //-- color: color, 같은 값이므로 뒤의값 삭제가능
  };
  return (
    <div style={sectionCss}>
      <div onMouseEnter={onMouseEnter}>Hover Me</div>
      {children}
      This is {title}
    </div>
  );
  // -- ?? : null 이거나 undefined라면 뒤의 내용을 보여줌
}
