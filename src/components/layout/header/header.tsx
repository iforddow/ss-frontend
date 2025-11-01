'use client';

import { IconChevronDown } from '@tabler/icons-react';
import { Burger, Center, Group, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './css/Header.module.css';
import Image from 'next/image';
import Link from 'next/link';

const links = [
    { link: '/programs', label: 'Programs' },
    {
        link: '',
        label: 'Get Started',
        links: [
            { link: '/enroll', label: 'How to Enroll in Daycare' },
            { link: '/choose-daycare', label: 'Choosing Your Daycare' },
            { link: '/first-day-guide', label: 'First Day Guide' },
        ],
    },
    {
        link: '/about',
        label: 'About Us',
        links: [
            { link: '/philosophy', label: 'Our Philosophy' },
            { link: '/meet-the-team', label: 'Meet the Team' },
        ],
    },
    {
        link: '/resources',
        label: 'Resources',
        links: [
            { link: 'https://peichildcareregistry.com/', label: 'PEI Childcare Registry' },
            { link: 'https://peichildcareregistry.com/calculator.php', label: 'Subsidy Calculator' },
            { link: 'https://psb.edu.pe.ca/parent-and-student-resources/storm-closures', label: 'Storm Closures' },
        ],
    },
    { link: '/contact', label: 'Contact' },
];

export function Header() {
    const [opened, { toggle }] = useDisclosure(false);

    const items = links.map((link) => {
        const menuItems = link.links?.map((item) => (
            <Menu.Item className={classes.menuItem} key={item.link}><Link href={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>{item.label}</Link></Menu.Item>
        ));

        if (menuItems) {
            return (
                <Menu key={link.label} trigger="hover"
                    offset={3} transitionProps={{ exitDuration: 0 }}
                    position='bottom-start'
                    withinPortal zIndex={1001}>
                    <Menu.Target>
                        <a
                            href={link.link}
                            className={classes.link}
                            onClick={(event) => event.preventDefault()}
                        >
                            <Center>
                                <span className={classes.linkLabel}>{link.label}</span>
                                <IconChevronDown size={14} stroke={3} />
                            </Center>
                        </a>
                    </Menu.Target>
                    <Menu.Dropdown>{menuItems}</Menu.Dropdown>
                </Menu>
            );
        }

        return (
            <Link
                key={link.label}
                href={link.link}
                className={classes.link}
            >
                {link.label}
            </Link>
        );
    });

    return (
        <header className={classes.header}>
            <div className={classes.inner}>
                <Link href={"/"}>
                    <Center>
                        <Image
                            src={'/superstars_logo.png'}
                            alt='Super Stars Logo'
                            width={258}
                            height={40}
                        />
                    </Center>
                </Link>
                <Group gap={"md"} visibleFrom="md">
                    {items}
                </Group>
                <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="md" />
            </div>
        </header>
    );
}