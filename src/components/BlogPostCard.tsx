import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { blogPostCard } from './styles/blogPostCard';

interface BlogPostCardProps {
  title: string;
  content: string;
}

const BlogPostCard = ({ title, content }: BlogPostCardProps) => {
  return (
    <View style={blogPostCard.cardContainer}>
      <View style={blogPostCard.titleContainer}>
        <Text style={blogPostCard.title}>{title}</Text>
      </View>
      <View style={blogPostCard.contentContainer}>
        <Text style={blogPostCard.content}>{content}</Text>
        <TouchableOpacity onPress={() => {}} style={blogPostCard.moreContainer}>
          <Text style={blogPostCard.more}>Read More...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BlogPostCard;
