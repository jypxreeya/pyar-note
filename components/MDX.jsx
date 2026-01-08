import TopNav from "./TopNav"
import Markdown from "markdown-to-jsx"
export default function MDX(props){
   const { text } = props
   const nd = `
   # this is hheader1 
   ## this is header 2
   hello world
   [click me](https://www.google.com)
   `
 return (
    <section className="mdx-container">
        <TopNav {...props}/>
         <article>
            <Markdown> 
               {text.trim() || 'create your first love note'}
            </Markdown>
         </article>
    </section>
 )   
}