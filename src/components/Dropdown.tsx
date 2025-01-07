import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    FlatList,
    StyleSheet,
    TextInput,
    Dimensions,
    Animated,
    Easing,
    ViewStyle,
    TextStyle,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Icon from './Icon';

export type DropdownItemProps = {
    label: string;
    value: any;
    [key: string]: any; 
}

export type ListMode = 'FLATLIST' | 'SCROLLVIEW';

interface DropdownProps {
    open: boolean;
    value: DropdownItemProps | DropdownItemProps[];
    items: DropdownItemProps[];
    setOpen: (open: boolean) => void;
    setValue: any;
    setItems: any;
    placeholder?: string;
    multiple?: boolean;
    min?: number;
    max?: number;
    disabled?: boolean;
    addCustomItem?: boolean;
    searchable?: boolean;
    showArrowIcon?: boolean;
    itemKey?: string;
    onSelectItem?: any;
    onChangeValue?: any;
    ListEmptyComponent?: React.ReactElement | null;
    containerStyle?: ViewStyle;
    modalContainerStyle?: ViewStyle;
    headerContainerStyle?: ViewStyle;
    headerTitleStyle?: TextStyle;
    textStyle?: TextStyle;
    placeholderStyle?: TextStyle;
    searchContainerStyle?: ViewStyle;
    searchInputStyle?: TextStyle;
    resetContainerStyle?: ViewStyle;
    resetIconStyle?: TextStyle;
    showResetIcon?: boolean;
    onReset?: any;
    listMode?: ListMode;
}

export const Dropdown = ({
    open,
    value,
    items,
    setOpen,
    setValue,
    setItems,
    placeholder = 'Select item',
    multiple = false,
    min = 0,
    max = 99,
    disabled = false,
    addCustomItem = false,
    searchable = false,
    showArrowIcon = true,
    itemKey = 'value',
    onSelectItem,
    onChangeValue,
    ListEmptyComponent,
    containerStyle = {},
    modalContainerStyle = {},
    headerContainerStyle = {},
    textStyle = {},
    headerTitleStyle = {},
    placeholderStyle = {},
    searchContainerStyle = {},
    searchInputStyle = {},
    resetContainerStyle = {},
    resetIconStyle = {},
    showResetIcon = false,
    onReset,
    listMode = "FLATLIST",
}: DropdownProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const spinValue = React.useRef(new Animated.Value(0)).current;
    const ITEM_HEIGHT = 56;
    const MAX_VISIBLE_ITEMS = 5;

    const calculateListHeight = (itemsCount: number, hasCustomItem: boolean = false) => {
        const totalItems = hasCustomItem ? itemsCount + 1 : itemsCount;
        const numberOfItems = Math.min(totalItems, MAX_VISIBLE_ITEMS);
        return ITEM_HEIGHT * numberOfItems;
    };

    

    React.useEffect(() => {
        Animated.timing(spinValue, {
            toValue: open ? 1 : 0,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
    }, [open]);

    const arrowRotate = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const handleSelect = (item: DropdownItemProps) => {
        if (onSelectItem) {
            onSelectItem(item);
        }

        if (multiple) {
            const values = Array.isArray(value) ? value : [];
            const isSelected = values.includes(item[itemKey]);
            
            let newValue: any[];
            if (isSelected) {
                if (values.length > min) {
                    newValue = values.filter((v) => v !== item[itemKey]);
                    setValue(newValue);
                    if (onChangeValue) {
                        onChangeValue(newValue);
                    }
                }
            } else {
                if (values.length < max) {
                    newValue = [...values, item[itemKey]];
                    setValue(newValue);
                    if (onChangeValue) {
                        onChangeValue(newValue);
                    }
                }
            }
        } else {
            setValue(item[itemKey]);
            if (onChangeValue) {
                onChangeValue(item[itemKey]);
            }
            setOpen(false);
            setSearchTerm('');
        }
    };

    const handleAddCustom = () => {
        if (searchTerm.trim()) {
            const newItem: DropdownItemProps = {
                label: searchTerm.trim(),
                [itemKey]: searchTerm.trim(),
            };
            setItems([...items, newItem]);
            //handleSelect(newItem);
            setSearchTerm('');
        }
    };

    const getSelectedLabels = () => {
        if (multiple) {
            if (!Array.isArray(value) || value.length === 0) {
                return placeholder || 'Select items';
            }
            return value
                .map((v) => items.find((item: DropdownItemProps) => item[itemKey] === v)?.label)
                .filter(Boolean)
                .join(', ') || placeholder;
        }
        return items.find((item: DropdownItemProps) => item[itemKey] === value)?.label || placeholder;
    };

    const filteredItems = items.filter(item => 
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const LIST_HEIGHT = calculateListHeight(filteredItems.length, searchTerm);
    
    const AddCustomItemComponent = () => (
        <TouchableOpacity 
            style={styles.item} 
            onPress={handleAddCustom}
            activeOpacity={0.7}
        >
            <Text style={[styles.itemText, textStyle]}>{searchTerm}</Text>
        </TouchableOpacity>
    );

    const renderItem = (item: DropdownItemProps) => (
        <TouchableOpacity
            key={item[itemKey]?.toString() || item.value?.toString()}
            style={[styles.item, { height: ITEM_HEIGHT }]}
            onPress={() => handleSelect(item)}
            activeOpacity={0.7}
        >
            <Text style={[styles.itemText, textStyle]} numberOfLines={1}>{item.label}</Text>
            
            {!multiple && value === item[itemKey] && (
                <Icon.CircleCheckIcon size={20}/>
            )}
            
            {multiple &&
                Array.isArray(value) &&
                value.includes(item[itemKey]) && (
                    <Icon.CircleCheckIcon size={20}/>
                )}
        </TouchableOpacity>
    );

    const EmptyComponent = () => (
        <View style={styles.emptyContainer}>
            {searchTerm ? (
                <Text style={[styles.emptyText, textStyle]}>
                    No matches found for "{searchTerm}"
                </Text>
            ) : (
                <Text style={[styles.emptyText, textStyle]}>
                    No options available
                </Text>
            )}
        </View>
    );

    const renderComponent = () => {
        if (addCustomItem && searchTerm.trim()) {
            return <AddCustomItemComponent />;
        }
        if (ListEmptyComponent) {
            return ListEmptyComponent;
        }
        return <EmptyComponent />;
    };

    const renderListContent = () => {
        if (filteredItems.length === 0) {
            return renderComponent();
        }

        if (listMode === 'SCROLLVIEW') {
            return (
                <ScrollView
                    style={{ height: LIST_HEIGHT }}
                    onStartShouldSetResponder={() => true}
                    onTouchEnd={(e) => e.stopPropagation()}
                    onResponderTerminationRequest={() => true}
                    showsVerticalScrollIndicator={true}
                >
                    {filteredItems.map(renderItem)}
                </ScrollView>
            );
        }

        return (
            <FlatList
                data={filteredItems}
                keyExtractor={(item) => item[itemKey]?.toString() || item.value?.toString()}
                ListEmptyComponent={renderComponent}
                renderItem={({ item }: { item: DropdownItemProps }) => renderItem(item)}
                onStartShouldSetResponder={() => true}
                onTouchEnd={(e) => e.stopPropagation()}
                onResponderTerminationRequest={() => true}
                showsVerticalScrollIndicator={true}
                style={{ height: LIST_HEIGHT }}
                getItemLayout={(data, index) => ({
                    length: ITEM_HEIGHT,
                    offset: ITEM_HEIGHT * index,
                    index,
                })}
            />
        );
    };

    const ArrowIcon = () => (
        <Animated.View
            style={[
                styles.arrow,
                {
                    transform: [{ rotate: arrowRotate }],
                },
            ]}
        >
            <Icon.ChevronDownIcon />
        </Animated.View>
    );

    return (
        <View style={[styles.container, containerStyle]}>
            <TouchableOpacity
                style={[
                    styles.headerContainer,
                    headerContainerStyle,
                    disabled && styles.disabled
                ]}
                onPress={() => !disabled && setOpen(true)}
                activeOpacity={0.7}
            >
                <Text 
                    style={[
                        styles.buttonText,
                        headerTitleStyle,
                        (!value || (Array.isArray(value) && value.length === 0)) && [styles.placeholderText, placeholderStyle]
                    ]}
                    numberOfLines={1}
                >
                    {getSelectedLabels()}
                </Text>
                {showArrowIcon && <ArrowIcon />}
            </TouchableOpacity>

            <Modal
                visible={open}
                transparent
                animationType="slide"
                onRequestClose={() => {
                    setOpen(false);
                    setSearchTerm('');
                }}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => {
                        setOpen(false);
                        setSearchTerm('');
                    }}
                >
                    <View 
                        style={[styles.modalContainer, modalContainerStyle]}
                        onStartShouldSetResponder={() => true}
                        onResponderRelease={(e) => e.stopPropagation()}
                    >
                        <View style={styles.modalHeader}>
                            <View style={styles.dragIndicator} />
                        </View>

                        <View style={styles.headerContent}>
                            <Icon.OpenAIIcon />
                            <Text style={[styles.headerTitle, textStyle]}>OpenAI</Text>
                        </View>
                        
                        {searchable && (
                            <View 
                                style={[searchContainerStyle, styles.searchContainer]}
                                onStartShouldSetResponder={() => true}
                                onResponderRelease={(e) => e.stopPropagation()}
                            >
                                <TextInput
                                    style={[
                                        styles.searchInput, 
                                        textStyle, 
                                        searchInputStyle,
                                        {width: showResetIcon ? "85%" : "100%"}
                                    ]}
                                    placeholder="Search or enter new option..."
                                    value={searchTerm}
                                    onChangeText={setSearchTerm}
                                />
                                {showResetIcon && (
                                    <TouchableOpacity 
                                        style={[resetContainerStyle, styles.resetButton]}
                                        onPress={onReset}
                                        activeOpacity={0.7}
                                    >
                                        <Icon.RestoreIcon style={resetIconStyle} />
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}

                        <View style={[styles.listContainer, { height: LIST_HEIGHT }]}>
                            {renderListContent()}
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    headerContainer: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    disabled: {
        opacity: 0.5,
    },
    buttonText: {
        fontSize: 16,
        flex: 1,
        marginRight: 8,
    },
    placeholderText: {
        color: '#999',
    },
    arrow: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: Dimensions.get('window').height * 0.8,
    },
    modalHeader: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    dragIndicator: {
        width: 40,
        height: 4,
        backgroundColor: '#DDDDDD',
        borderRadius: 2,
    },
    headerContent: {
        flexDirection: "row",
        padding: 12,
        marginLeft: 5,
        alignItems: "center"
    },
    headerTitle: {
        fontSize: 14,
        marginLeft: 13
    },
    searchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 18,
        marginBottom: 8
    },
    searchInput: {
        height: 40,
        marginVertical: 5,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        borderColor: '#ccc',
    },
    resetButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    listContainer: {
        marginHorizontal: 5,
        marginBottom: 25,
    },
    item: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 16,
        flex: 1,
    },
    emptyContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 12,
    },
});