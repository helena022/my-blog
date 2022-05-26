import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { truncateString } from '../utils/stringUtils';
import { blogPostCard } from './styles/blogPostCard';

interface BlogPostCardProps {
  title: string;
  content: string;
}

const BlogPostCard = ({ title, content }: BlogPostCardProps) => {
  const shortenedContent = truncateString(content, 250);
  return (
    <View style={blogPostCard.cardContainer}>
      <View style={blogPostCard.titleContainer}>
        <Text style={blogPostCard.title}>{title}</Text>
      </View>
      <View style={blogPostCard.contentContainer}>
        <Text style={blogPostCard.content}>{shortenedContent}</Text>
        <TouchableOpacity onPress={() => {}} style={blogPostCard.moreContainer}>
          <Text style={blogPostCard.more}>Read More...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BlogPostCard;
