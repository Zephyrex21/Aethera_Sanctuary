import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center",
                    justifyContent:"center", backgroundColor:"#fff", padding:"2rem" }}>
        <div style={{ textAlign:"center", maxWidth:420 }}>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"11px",
                      letterSpacing:"0.2em", textTransform:"uppercase",
                      color:"#9B4456", marginBottom:"1rem" }}>
            Unexpected Error
          </p>
          <h2 style={{ fontFamily:"'Instrument Serif',serif", fontSize:"2rem",
                       color:"#000", marginBottom:"0.75rem" }}>
            The sanctuary stumbled.
          </h2>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px",
                      color:"#6F6F6F", lineHeight:1.7, marginBottom:"1.5rem" }}>
            Something went wrong while rendering the page. This is usually a
            temporary issue.
          </p>
          {this.state.error && (
            <code style={{ display:"block", fontSize:"11px", color:"#c0392b",
                           backgroundColor:"#FFF0F0", borderRadius:8,
                           padding:"0.6rem 1rem", marginBottom:"1.5rem",
                           textAlign:"left", lineHeight:1.6 }}>
              {this.state.error.message}
            </code>
          )}
          <button
            onClick={() => window.location.reload()}
            style={{ backgroundColor:"#000", color:"#fff",
                     borderRadius:"9999px", padding:"0.75rem 2.5rem",
                     fontFamily:"'Inter',sans-serif", fontSize:"13px",
                     border:"none", cursor:"pointer" }}
          >
            Reload page
          </button>
        </div>
      </div>
    );
  }
}
