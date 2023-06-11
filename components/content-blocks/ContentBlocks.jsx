import React from "react";

import {
  Category,
  Content,
  HeaderContainer,
  Headline,
  Post,
  PostsContainer,
  PostTitle,
  Wrapper,
} from "./ContentBlocks.style";

const Section = ({ headers, posts }) => {
  const { category, headline } = headers;
  return (
    <>
      <Wrapper>
        <HeaderContainer>
          <Category>{category}</Category>
          <Headline>{headline}</Headline>
        </HeaderContainer>

        <PostsContainer>
          {posts.map((post) => {
            const { id, subheadline, description } = post;
            return (
              <Post key={id}>
                <PostTitle>{subheadline}</PostTitle>
                <Content>
                  {description.map((par, index) => {
                    const { content } = par;
                    return (
                      <div
                        key={index}
                        dangerouslySetInnerHTML={{ __html: content }}
                      ></div>
                    );
                  })}
                </Content>
              </Post>
            );
          })}
        </PostsContainer>
      </Wrapper>
    </>
  );
};

export default Section;
