"use client";

import { IconBrandFacebook, IconBrandInstagram, IconBrandYoutube } from '@tabler/icons-react';
import { ActionIcon, Box, Container, Flex, Group, SimpleGrid, Text } from '@mantine/core';
import classes from './css/Footer.module.css';
import Image from 'next/image';
import { useMediaQuery } from '@mantine/hooks';

const data = [
    {
        title: 'About',
        links: [
            { label: 'Features', link: '#' },
            { label: 'Pricing', link: '#' },
            { label: 'Support', link: '#' },
            { label: 'Forums', link: '#' },
        ],
    },
    {
        title: 'Project',
        links: [
            { label: 'Contribute', link: '#' },
            { label: 'Media assets', link: '#' },
            { label: 'Changelog', link: '#' },
            { label: 'Releases', link: '#' },
        ],
    },
];

export default function Footer() {

    const isMobile = useMediaQuery('(max-width: 768px)');

    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Text<'a'>
                key={index}
                className={classes.link}
                component="a"
                href={link.link}
                onClick={(event) => event.preventDefault()}
            >
                {link.label}
            </Text>
        ));

        return (
            <div className={classes.wrapper} key={group.title}>
                <Text className={classes.title} mt={isMobile ? 'sm' : 0}>{group.title}</Text>
                {links}
            </div>
        );
    });

    return (
        <footer className={classes.footer}>
            <Container className={classes.inner}>
                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <div className={classes.logo}>
                        <Box ta={isMobile ? 'center' : 'left'}>
                            <Image
                                src={'/superstars_logo.png'}
                                alt='Super Stars Logo'
                                width={258}
                                height={40}
                            />
                            <Text size="xs" c="white" className={classes.description}>
                                Build fully functional accessible web applications faster than ever
                            </Text>
                        </Box>
                    </div>
                    <Flex wrap={isMobile ? 'wrap' : 'nowrap'} justify={isMobile ? 'center' : 'end'} ta={isMobile ? 'center' : 'left'}>{groups}</Flex>
                </SimpleGrid>
            </Container>
            <Container className={classes.afterFooter}>
                <Text c="white" size="sm">
                    © 2025 Super Stars Daycare Inc. All rights reserved.
                </Text>

                <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
                    <ActionIcon size="lg" color="white" variant="subtle">
                        <IconBrandFacebook size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" color="white" variant="subtle">
                        <IconBrandYoutube size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" color="white" variant="subtle">
                        <IconBrandInstagram size={18} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
}