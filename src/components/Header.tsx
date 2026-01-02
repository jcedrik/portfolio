interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header style={styles.header}>
      <span style={styles.logo}>JCD</span>
      <button style={styles.menuBtn} onClick={onMenuClick}>
        MENU
      </button>
    </header>
  );
}

const styles = {
  header: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    padding: "24px",
    display: "flex",
    justifyContent: "space-between",
    zIndex: 20
  },
  logo: { color: "white" },
  menuBtn: {
    background: "#C8FF4D",
    border: "none",
    borderRadius: "999px",
    padding: "10px 18px",
    cursor: "pointer"
  }
};
