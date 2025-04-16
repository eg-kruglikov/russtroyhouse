export const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f1f3f6",
    // backgroundColor: "#fffaf1",
    color: "#333",
  },
  header: {
    backgroundColor: "#1c2e52",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  phone: {
    fontSize: "16px",
    fontWeight: "500",
  },
  section: {
    padding: "40px 20px",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "26px",
    marginBottom: "20px",
  },
  sectionText: {
    fontSize: "16px",
    maxWidth: "600px",
    margin: "0 auto 30px",
  },
  button: {
    padding: "14px 30px",
    fontSize: "16px",
    backgroundColor: "#f97316",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "left",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "8px",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
    backgroundColor: "#ccc",
  },
  text: {
    fontSize: "14px",
    margin: "4px 0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxWidth: "400px",
    margin: "0 auto",
  },
  input: {
    padding: "12px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  footer: {
    backgroundColor: "#1c2e52",
    color: "#fff",
    textAlign: "center",
    padding: "30px 20px",
    marginTop: "40px",
    fontSize: "14px",
  },
};

export const headerStyles = {
  header: {
    backgroundColor: "#1c2e52",
    padding: "16px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  },
  logo: {
    height: "48px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    marginLeft: "12px",
  },
  phone: {
    fontSize: "16px",
    fontWeight: "500",
  },
};
