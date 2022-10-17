import { FontAwesome } from '@expo/vector-icons';
import * as React from 'react';

export function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }
  } {...props} />;
}