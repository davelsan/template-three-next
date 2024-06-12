import type {
  ComponentProps,
  ForwardRefExoticComponent,
  ReactNode,
} from 'react';

/**
 * Higher Order Component (HOC) to add static properties to a given component.
 *
 * Its main purpose is to allow component composition, where subcomponents can
 * be declared as static properties of other components, and then accessed via
 * the parent component JSX declaration.
 *
 * This is particularly useful when the parent component shares `Context` state
 * with its static children.
 *
 * @example
 *
 * // Providing component
 * function Article() { ... }
 * function ArticleHeader() { ... }
 * function ArticleFooter() { ... }
 *
 * export default withStaticProps(Article, {
 *   Header: ArticleHeader,
 *   Footer: ArticleFooter,
 * })
 *
 * // Consuming component
 * export function ComponentThatUsesArticle() {
 *   return (
 *     <Article>
 *       <Article.Header/>
 *       { ... }
 *       <Article.Footer/>
 *     </Article>
 *   )
 * }
 */
export function withStaticProps<
  Component extends
    | ((props: ComponentProps<Component>) => ReactNode)
    | ForwardRefExoticComponent<ComponentProps<Component>>,
  Props,
>(component: Component, staticProps: Props): Component & Props {
  return Object.assign(component, staticProps);
}
