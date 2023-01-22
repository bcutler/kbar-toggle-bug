import { useRouter } from 'next/router'
import posts from '../data/posts'
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches
} from "kbar";

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div style={groupNameStyle}>{item}</div>
        ) : (
          <div style={{
            background: active ? "#eee" : "transparent", 
            padding: "8px 16px",
          }}>
            {item.name}
          </div>
        )
      }
    />
  );
}

export default function Search() {
  const router = useRouter()
  let actions = []

  posts.actions.forEach(action => {
    actions.push({
      id: action.path,
      name: action.name || action.path,
      shortcut: [action.shortcut],
      perform: () => router.push(action.path)
    })
  })

  return (
      <KBarProvider actions={actions}>
        <KBarPortal> 
          <KBarPositioner>
            <KBarAnimator style={animatorStyle}>
              <KBarSearch style={searchStyle} />
              <RenderResults />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>
      </KBarProvider>
  )
}

const searchStyle = {
  padding: "12px 16px",
  fontSize: "16px",
  width: "100%",
  boxSizing: "border-box",
  outline: "none",
  border: "none",
  background: "rgb(252 252 252)",
  color: "rgb(28 28 29)",
};

const animatorStyle = {
  maxWidth: "600px",
  width: "100%",
  background: "rgb(252 252 252)",
  color: "rgb(28 28 29)",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0px 6px 20px rgb(0 0 0 / 20%)",
};

const groupNameStyle = {
  padding: "8px 16px",
  fontSize: "10px",
  textTransform: "uppercase",
  opacity: 0.5,
};

