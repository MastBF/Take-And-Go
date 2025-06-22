import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import type { SxProps } from '@mui/material/styles';
import { DotsThreeVertical as DotsThreeVerticalIcon } from '@phosphor-icons/react/dist/ssr/DotsThreeVertical';
import dayjs from 'dayjs';

export interface Product {
  id: string;
  fileName: string;
  name: string;
  updatedAt: Date;
}

export interface LatestProductsProps {
  products?: Product[];
  sx?: SxProps;
}

export function LatestProducts({ products = [], sx }: LatestProductsProps): React.JSX.Element {
  return (
    <Card sx={{
      backgroundColor: '#1A1A1A',
      color: 'rgba(255, 255, 255, 0.87)',
      ...sx
    }}>
      <CardHeader
        title="Latest products"
        titleTypographyProps={{ color: 'rgba(255, 255, 255, 0.87)' }}
      />
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
      
      {products.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 200,
            p: 3,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              mb: 1
            }}
          >
            No products yet
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.3)',
              maxWidth: '80%'
            }}
          >
            Product information will appear here after the first orders
          </Typography>
        </Box>
      ) : (
        <List>
          {products.map((product, index) => (
            <ListItem
              divider={index < products.length - 1}
              key={product.id}
              sx={{
                '& .MuiListItemText-primary': {
                  color: 'rgba(255, 255, 255, 0.87)'
                },
                '& .MuiListItemText-secondary': {
                  color: 'rgba(255, 255, 255, 0.6)'
                },
                borderBottom: index < products.length - 1 ? '1px solid rgba(255, 255, 255, 0.12)' : 'none'
              }}
            >
              <ListItemAvatar>
                {product.fileName ? (
                  <Box
                    component="img"
                    src={product.fileName}
                    sx={{
                      width: 40,
                      resizeMode: 'contain',
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      borderRadius: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      height: '48px',
                      width: '48px',
                    }}
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`Updated ${dayjs(product.updatedAt).format('MMM D, YYYY')}`}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <IconButton edge="end">
                <DotsThreeVerticalIcon color="rgba(255, 255, 255, 0.54)" />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </Card>
  );
}